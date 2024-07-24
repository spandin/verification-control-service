import { Body, Controller, Get, HttpException, HttpStatus, Post, Req } from '@nestjs/common'
import { AuthService } from './auth.service'
import { LoginDto } from './dto/login.dto'
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger'
import { Request } from 'express'
import { GetMeDto } from './dto/get-me.dto'
import { Auth } from './auth.decorator'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
  @Auth()
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
  @Auth()
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
