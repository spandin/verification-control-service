import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UserDto } from './dto/index.dto'

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

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
