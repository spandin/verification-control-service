import { ApiProperty } from '@nestjs/swagger'

export class GetMeDto {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  id: number

  @ApiProperty({ example: 'John', description: 'The first name of the user' })
  name: string

  @ApiProperty({ example: '+375000000000', description: 'User phone' })
  phone: string

  @ApiProperty({ example: 'example@email.com', description: 'User email address' })
  email: string

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'The avatar URL of the user',
  })
  avatar: string

  @ApiProperty({
    example: '2023-05-19T14:48:00.000Z',
    description: 'The date and time when the user was created',
  })
  createdAt: Date

  @ApiProperty({ example: 'CLIENT', description: 'The role of the user' })
  role: string
}
