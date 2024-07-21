import { ApiProperty } from '@nestjs/swagger'
import { IsOptional, MaxLength, MinLength } from 'class-validator'

export class UpdateDeviceDto {
  @ApiProperty({ example: 'Lorem Ipsum', description: 'The name of the device', type: String })
  @MinLength(6)
  @MaxLength(32)
  name?: string

  @ApiProperty({
    example: '00000000',
    description: 'The identification number of the device',
    type: String,
  })
  @MinLength(5)
  @MaxLength(24)
  number?: string

  @ApiProperty({
    description: 'The type of the device',
    type: String,
  })
  type?: string

  @ApiProperty({
    description: 'The type of the device',
    type: String,
  })
  category?: string

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'The description of the device',
    type: String,
  })
  @IsOptional()
  description?: string

  @ApiProperty({
    example: '2023-05-19T14:48:00.000Z',
    description: 'The date and time when the publication was verified',
    type: Date,
  })
  from?: Date

  @ApiProperty({
    example: '2023-05-19T14:48:00.000Z',
    description: 'The date and time when the device will not be verified',
    type: Date,
  })
  to?: Date
}
