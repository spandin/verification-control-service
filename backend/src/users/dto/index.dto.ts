import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator'
import { RoleTypes } from 'types'

export class UserDto {
  @ApiProperty({ example: '1', description: 'User id', type: Number })
  @IsNotEmpty()
  @IsNumber()
  id: number

  @ApiProperty({ example: 'Name', description: 'User name', type: String })
  @IsString()
  name: string

  @ApiProperty({ example: '375000000000', description: 'User phone', type: String })
  @IsString()
  phone: string

  @ApiProperty({ example: 'example@email.com', description: 'User email address', type: String })
  @IsEmail()
  email: string

  @ApiProperty({ example: '375000000000', description: 'User phone', type: String })
  @IsString()
  avatar: string

  @ApiProperty({ example: { id: 'ROLE_NAME', name: 'role-name' }, description: 'Role name' })
  @IsObject()
  role: RoleTypes
}
