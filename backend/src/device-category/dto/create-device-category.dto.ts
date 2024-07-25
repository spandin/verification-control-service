import { ApiProperty } from '@nestjs/swagger'
import {
  IsLowercase,
  IsNotEmpty,
  IsString,
  IsUppercase,
  MaxLength,
  MinLength,
} from 'class-validator'

export class CreateDeviceCategoryDto {
  @ApiProperty({ example: 'DEVICE_CATEGORY_ID', description: 'Category id', type: String })
  @IsUppercase()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  id: string

  @ApiProperty({ example: 'device-category-name', description: 'Category name', type: String })
  @IsLowercase()
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  name: string
}
