import * as bcrypt from 'bcrypt'
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDto } from './dto/user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { AuthService } from 'src/auth/auth.service'

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{ token: string }> {
    const { phone, email, password, name, role: roleName } = createUserDto

    const role = await this.prisma.role.findUnique({
      where: { name: roleName },
    })
    if (!role) {
      throw new BadRequestException('Invalid role. Must be a valid role.')
    }

    if (role.name === 'администратор') {
      throw new BadRequestException(
        'Invalid request. Cannot created as an administrator or invalid role.',
      )
    }

    const allRoles = await this.prisma.role.findMany({
      select: {
        name: true,
      },
    })

    const validRoles = allRoles.map((role) => role.name)
    if (!validRoles.includes(role.name)) {
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
        role: {
          connect: { id: role.id },
        },
      },
    })

    return this.authService.generateAndSaveToken(user)
  }

  async getUsers(): Promise<UserDto[]> {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        avatar: true,
        role: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    if (users.length === 0) {
      throw new NotFoundException('No users found')
    }

    try {
      return users
    } catch (error) {
      console.error('Error fetching users:', error)
      throw new InternalServerErrorException('An error occurred while fetchink the users.')
    }
  }
}
