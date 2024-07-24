import { ApiProperty } from '@nestjs/swagger'
import { DeviceCategory, DeviceType, Organization } from '@prisma/client'

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
    description: 'The type of the device',
    type: String,
  })
  type: DeviceType

  @ApiProperty({
    description: 'The type of the device',
    type: String,
  })
  category: DeviceCategory

  @ApiProperty({
    example: 'organization name',
    description: 'The organization of the device',
    type: String,
  })
  organization: Organization

  @ApiProperty({
    example: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    description: 'The description of the device',
    type: String,
  })
  description: string

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
