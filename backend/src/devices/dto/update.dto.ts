import { ApiProperty } from '@nestjs/swagger'
import { IsOptional } from 'class-validator'

export class UpdateDeviceDto {
  @ApiProperty({ example: 'Lorem Ipsum', description: 'The name of the device', type: String })
  @IsOptional()
  name?: string

  @ApiProperty({
    example: '00000000',
    description: 'The identification number of the device',
    type: String,
  })
  @IsOptional()
  number?: string

  @ApiProperty({
    example: 'type | marks',
    description: 'The type of the device',
    type: String,
  })
  @IsOptional()
  type?: string

  @ApiProperty({
    description: 'The category of the device',
    type: String,
  })
  @IsOptional()
  category?: string

  @ApiProperty({
    example: 'organization name',
    description: 'The organization of the device',
    type: String,
  })
  @IsOptional()
  organization: string

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
  @IsOptional()
  from?: Date

  @ApiProperty({
    example: '2023-05-19T14:48:00.000Z',
    description: 'The date and time when the device will not be verified',
    type: Date,
  })
  @IsOptional()
  to?: Date
}
