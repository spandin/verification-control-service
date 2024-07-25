import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateDeviceTypeDto {
  @ApiProperty({ example: 'DeviceType1', description: 'Type name', type: String })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(32)
  name: string

  @ApiProperty({ example: 'DEVICE_CATEGORY_ID', description: 'Category ID', type: String })
  @IsNotEmpty()
  @IsString()
  categoryId: string
}
