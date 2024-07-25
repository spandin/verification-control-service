import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RequsterTypes } from 'types'
import { CreateDeviceTypeDto } from './dto/create-device-type.dto'
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto'

@Injectable()
export class DeviceTypeService {
  constructor(private prisma: PrismaService) {}

  // Find all device types
  async findAll(): Promise<CreateDeviceTypeDto[]> {
    const deviceTypes = await this.prisma.deviceType.findMany()

    if (!deviceTypes) {
      throw new NotFoundException('Device types not found.')
    }

    try {
      return deviceTypes
    } catch (error) {
      console.error('Error fetching device types:', error)
      throw new InternalServerErrorException('An error occurred while fetching device types.')
    }
  }

  // Find one device type
  async findOne(id: string): Promise<UpdateDeviceTypeDto> {
    const deviceType = await this.prisma.deviceType.findUnique({
      where: { id: parseInt(id) },
      select: { name: true, categoryId: true },
    })

    if (!deviceType) {
      throw new NotFoundException(`Device type with ID ${id} not found`)
    }

    try {
      return deviceType
    } catch (error) {
      console.error('Error fetching device type:', error)
      throw new InternalServerErrorException('An error occurred while fetching the device type.')
    }
  }

  // Create device type
  async createDeviceType(
    createDeviceType: CreateDeviceTypeDto,
    requester: RequsterTypes,
  ): Promise<CreateDeviceTypeDto> {
    if (requester.role !== 'администратор') {
      throw new ForbiddenException('Access denied. Only the admin can create it.')
    }

    if (!createDeviceType.name) {
      throw new BadRequestException('Device type name is required.')
    }

    const existingDeviceType = await this.prisma.deviceType.findUnique({
      where: { name: createDeviceType.name },
    })

    if (existingDeviceType) {
      throw new BadRequestException(`Device type "${createDeviceType.name}" already exists.`)
    }

    try {
      return this.prisma.deviceType.create({ data: createDeviceType })
    } catch (error) {
      console.error('Error creating device type:', error)
      throw new InternalServerErrorException('An error occurred while creating the device type.')
    }
  }

  // Update device type
  async updateDeviceType(id: string, data: UpdateDeviceTypeDto, requester: RequsterTypes) {
    if (requester.role !== 'администратор') {
      throw new ForbiddenException('Access denied. Only the admin can update it.')
    }

    const deviceType = await this.prisma.deviceType.findUnique({ where: { id: parseInt(id) } })
    if (!deviceType) {
      throw new NotFoundException(`Device type with ID "${id}" not found.`)
    }

    try {
      return this.prisma.deviceType.update({ where: { id: parseInt(id) }, data })
    } catch (error) {
      console.error('Error updating device type:', error)
      throw new InternalServerErrorException('An error occurred while updating the device type.')
    }
  }

  // Delete device type
  async deleteDeviceType(id: string, requester: RequsterTypes): Promise<void> {
    if (requester.role !== 'администратор') {
      throw new ForbiddenException('Access denied. Only the admin can delete it.')
    }

    const deviceType = await this.prisma.deviceType.findUnique({ where: { id: parseInt(id) } })
    if (!deviceType) {
      throw new NotFoundException(`Device type with ID "${id}" not found.`)
    }

    try {
      await this.prisma.deviceType.delete({ where: { id: parseInt(id) } })
    } catch (error) {
      console.error('Error deleting device type:', error)
      throw new InternalServerErrorException('An error occurred while deleting the device type.')
    }
  }
}
