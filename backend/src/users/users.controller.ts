import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  ValidationPipe,
} from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { UsersService } from './users.service'
import { UserDto } from './dto/user.dto'
import { Auth } from 'src/auth/auth.decorator'
import { CreateUserDto } from './dto/create-user.dto'

@ApiTags('users')
@Controller('users')
export class UsersController {
  authService: any
  constructor(private readonly usersService: UsersService) {}

  @Post('create-user')
  @ApiOperation({
    summary: 'Create a new user',
    description: 'Create a new user with the provided details.',
  })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid request. Cannot created as an administrator or invalid role.',
  })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async register(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ statusCode: number; message: string; token: string }> {
    try {
      const result = await this.usersService.createUser(createUserDto)
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User created successfully.',
        token: result.token,
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

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
