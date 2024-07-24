import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { User } from '@prisma/client'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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

  async getMe(userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        phone: true,
        email: true,
        avatar: true,
        createdAt: true,
        role: {
          select: {
            name: true,
          },
        },
      },
    })

    if (!user) {
      throw new NotFoundException('User not found.')
    }

    return user
  }

  async generateAndSaveToken(user: User): Promise<{ token: string }> {
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
