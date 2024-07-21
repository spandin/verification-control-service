import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { Role, User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { GetMeDto } from './dto/get-me.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ token: string }> {
    const { phone, email, password, name, role } = registerDto

    if (role === Role.ADMIN) {
      throw new BadRequestException(
        'Invalid request. Cannot register as an administrator or invalid role.',
      )
    }

    if (![Role.USER, Role.ENERGY_ENGINEER, Role.ELECTRICAL_ENGINEER].includes(role)) {
      throw new BadRequestException('Invalid request. Invalid role.')
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email } })
    if (existingUser) {
      throw new ConflictException('User already exists.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.prisma.user.create({
      data: {
        phone,
        email,
        password: hashedPassword,
        name,
        role,
      },
    })

    return this.generateAndSaveToken(user)
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto
    const user = await this.prisma.user.findUnique({ where: { email } })
    if (!user) {
      throw new UnauthorizedException('User not found.')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid user password.')
    }

    await this.deleteUserToken(user.id)

    return this.generateAndSaveToken(user)
  }

  async logout(token: string): Promise<void> {
    const decoded = this.jwtService.decode(token) as { userId: number }
    if (decoded && decoded.userId) {
      await this.deleteUserToken(decoded.userId, token)
    }
  }

  async getMe(userId: number): Promise<GetMeDto> {
    const user = this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        avatar: true,
        createdAt: true,
        role: true,
      },
    })

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    return user
  }

  private async generateAndSaveToken(user: User): Promise<{ token: string }> {
    const payload = { userId: user.id, email: user.email }
    const token = this.jwtService.sign(payload)

    await this.prisma.token.create({
      data: {
        token,
        userId: user.id,
      },
    })

    return { token }
  }

  private async deleteUserToken(userId: number, token?: string): Promise<void> {
    await this.prisma.token.deleteMany({
      where: { userId, token },
    })
  }
}
