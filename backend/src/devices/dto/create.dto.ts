import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator'

export class CreateDeviceDto {
  @ApiProperty({ example: 'Lorem Ipsum', description: 'The name of the device', type: String })
  @MinLength(6)
  @MaxLength(32)
  @IsNotEmpty()
  name: string

  @ApiProperty({
    example: '00000000',
    description: 'The identification number of the device',
    type: String,
  })
  @MinLength(5)
  @MaxLength(24)
  @IsNotEmpty()
  number: string

  @ApiProperty({
    description: 'The type of the device',
    type: String,
  })
  @IsNotEmpty()
  type: string

  @ApiProperty({
    description: 'The type of the device',
    type: String,
  })
  @IsNotEmpty()
  category: string

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
  @IsNotEmpty()
  from: Date

  @ApiProperty({
    example: '2023-05-19T14:48:00.000Z',
    description: 'The date and time when the device will not be verified',
    type: Date,
  })
  @IsNotEmpty()
  to: Date
}