import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthGuard } from '@nestjs/passport'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { ApiTags, ApiResponse, ApiBearerAuth, ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'
import { GetMeDto } from './dto/get-me.dto'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Register a new user',
    description: 'Registers a new user with the provided details.',
  })
  @ApiResponse({ status: 201, description: 'User registered successfully.' })
  @ApiResponse({
    status: 400,
    description: 'Invalid request. Cannot register as an administrator or invalid role.',
  })
  @ApiResponse({ status: 409, description: 'User already exists.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async register(
    @Body(ValidationPipe) registerDto: RegisterDto,
  ): Promise<{ statusCode: number; message: string; token: string }> {
    try {
      const result = await this.authService.register(registerDto)
      return {
        statusCode: HttpStatus.CREATED,
        message: 'User registered successfully.',
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

  @Post('login')
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticates a user and returns a JWT token.',
  })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'User authentication failed.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  @ApiResponse({ status: 422, description: 'Invalid user password.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async login(
    @Body() loginDto: LoginDto,
  ): Promise<{ statusCode: number; message: string; token: string }> {
    try {
      const result = await this.authService.login(loginDto)
      return {
        statusCode: HttpStatus.OK,
        message: 'User logged in successfully.',
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

  @Post('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Logout user',
    description: 'Invalidates the user session and logs the user out.',
  })
  @ApiResponse({ status: 200, description: 'Successfully logged out.' })
  @ApiResponse({ status: 400, description: 'Authorization header is missing.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async logout(@Req() req: Request): Promise<{ statusCode: number; message: string }> {
    try {
      const authHeader = req.headers['authorization']
      if (!authHeader) {
        throw new HttpException('Authorization header is missing.', HttpStatus.BAD_REQUEST)
      }

      const token = authHeader.toString().split(' ')[1]
      await this.authService.logout(token)

      return {
        statusCode: HttpStatus.OK,
        message: 'Successfully logged out',
      }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Get('me')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: 'Get current user',
    description: 'Returns information about the current authenticated user.',
  })
  @ApiResponse({ status: 200, description: 'Returns the current user.', type: GetMeDto })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getCurrentUser(@Req() req) {
    try {
      const userId = req.user.id
      return await this.authService.getMe(userId)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
