import { ApiProperty } from '@nestjs/swagger'
import { DeviceCategory, DeviceType } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class GetDeviceById {
  @ApiProperty({ example: 'Lorem Ipsum', description: 'The name of the device', type: String })
  name: string

  @ApiProperty({
    example: '00000000',
    description: 'The identification number of the device',
    type: String,
  })
  number: string

  @ApiProperty({
    example: DeviceType[0],
    description: 'The type of the device',
    enum: DeviceType,
    type: String,
  })
  @IsEnum(DeviceType)
  type: DeviceType

  @ApiProperty({
    example: DeviceCategory[0],
    description: 'The type of the device',
    enum: DeviceCategory,
    type: String,
  })
  @IsEnum(DeviceCategory)
  category: DeviceCategory

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'The description of the device',
    type: String,
  })
  @IsOptional()
  description?: string

  @ApiProperty({
    example: '2023-05-19T14:48:00.000Z',
    description: 'The date and time when the device was created',
    type: Date,
  })
  createdAt: Date

  @ApiProperty({
    example: '2023-05-19T14:48:00.000Z',
    description: 'The date and time when the device was updated',
    type: Date,
  })
  updatedAt: Date

  @ApiProperty({
    example: '2023-05-19T14:48:00.000Z',
    description: 'The date and time when the publication was verified',
    type: Date,
  })
  from: Date

  @ApiProperty({
    example: '2023-05-19T14:48:00.000Z',
    description: 'The date and time when the device will not be verified',
    type: Date,
  })
  to: Date
}
