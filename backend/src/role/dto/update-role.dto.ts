import { ApiProperty } from '@nestjs/swagger'
import { IsLowercase, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateRoleDto {
  @ApiProperty({ example: 'role-name', description: 'Role name', type: String })
  @IsLowercase()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  name: string
}
