import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsOptional } from 'class-validator'

export class RegisterDto {
  @ApiProperty({ description: 'User name' })
  @IsNotEmpty()
  @MinLength(2)
  name: string

  @ApiProperty({ description: 'User phone' })
  @IsOptional()
  @MinLength(5)
  @MaxLength(13)
  phone?: string

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

  @ApiProperty({
    description: 'User role',
  })
  @IsNotEmpty()
  role: string
}
