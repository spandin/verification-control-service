import { ApiProperty } from '@nestjs/swagger'
import {
  IsLowercase,
  IsNotEmpty,
  IsString,
  IsUppercase,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateRoleDto {
  @ApiProperty({ example: 'ROLE_ID', description: 'Role name', type: String })
  @IsUppercase()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  id: string

  @ApiProperty({ example: 'role-name', description: 'Role name', type: String })
  @IsLowercase()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  name: string
}
