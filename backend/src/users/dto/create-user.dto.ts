import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsEmail, MinLength, MaxLength, IsOptional, IsLowercase } from 'class-validator'

export class CreateUserDto {
  @ApiProperty({ example: 'Name', description: 'User name', type: String })
  @IsNotEmpty()
  @MinLength(2)
  name: string

  @ApiProperty({ example: '375000000000', description: 'User phone', type: String })
  @IsOptional()
  @MinLength(5)
  @MaxLength(13)
  phone?: string

  @ApiProperty({ example: 'example@email.com', description: 'User email address', type: String })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  email: string

  @ApiProperty({ example: 'password', description: 'User password', type: String })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string

  @ApiProperty({ example: 'role-name', description: 'User role', type: String })
  @IsLowercase()
  @IsNotEmpty()
  role: string
}
