import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class LoginDto {
  @ApiProperty({ example: 'example@email.com', description: 'User email address', type: String })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(32)
  email: string

  @ApiProperty({ example: 'password', description: 'User password', type: String })
  @IsString()
  @IsNotEmpty()
  password: string
}
