import { Controller, Get, HttpException, HttpStatus } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UserDto } from './dto/index.dto'
import { Auth } from 'src/auth/auth.decorator'

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @Auth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserDto] })
  @ApiResponse({ status: 404, description: 'Users not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getUsers(): Promise<UserDto[]> {
    try {
      return this.usersService.getUsers()
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
