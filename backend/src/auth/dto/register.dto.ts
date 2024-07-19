import { ApiProperty } from '@nestjs/swagger'
import { Role } from '@prisma/client'
import { IsNotEmpty, IsEmail, MinLength, MaxLength } from 'class-validator'

export class RegisterDto {
  @ApiProperty({ description: 'User phone' })
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(12)
  phone: string

  @ApiProperty({ description: 'User email address' })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  email: string

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string

  @ApiProperty({ description: 'User name' })
  @IsNotEmpty()
  @MinLength(2)
  name: string

  @ApiProperty({ description: 'User role', enum: ['USER', 'EXPERT'] })
  @IsNotEmpty()
  role: Role
}
