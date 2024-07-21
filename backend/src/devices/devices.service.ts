import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateDeviceDto } from './dto/create.dto'
import { RequsterTypes } from 'types'
import { DeviceType, DeviceCategory, Device } from '@prisma/client'
import { UpdateDeviceDto } from './dto/update.dto'

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  // Create Device Service
  async createDevice(
    createDeviceDto: CreateDeviceDto,
    requester: RequsterTypes,
  ): Promise<Omit<Device, 'userId' | 'updatedAt'>> {
    const { name, number, type, category, description, from, to } = createDeviceDto

    if (!name || name.length < 6 || name.length > 32) {
      throw new BadRequestException('Invalid name. Must be between 6 and 32 characters.')
    }
    if (!number || number.length < 5 || number.length > 24) {
      throw new BadRequestException('Invalid number. Must be between 5 and 24 characters.')
    }
    if (!Object.values(DeviceType).includes(type)) {
      throw new BadRequestException('Invalid type. Must be a valid DeviceType.')
    }
    if (!Object.values(DeviceCategory).includes(category)) {
      throw new BadRequestException('Invalid category. Must be a valid DeviceCategory.')
    }
    if (!from || isNaN(new Date(from).getTime())) {
      throw new BadRequestException('Invalid from date.')
    }
    if (!to || isNaN(new Date(to).getTime())) {
      throw new BadRequestException('Invalid to date.')
    }

    try {
      return await this.prisma.device.create({
        data: {
          name,
          number,
          type,
          category,
          description,
          from,
          to,
          user: {
            connect: { id: requester.id },
          },
        },
        select: {
          id: true,
          name: true,
          number: true,
          type: true,
          category: true,
          description: true,
          createdAt: true,
          from: true,
          to: true,
          user: { select: { id: true, name: true, phone: true, email: true, avatar: true } },
        },
      })
    } catch (error) {
      console.error('Error creating device:', error)
      throw new InternalServerErrorException('An error occurred while creating the device.')
    }
  }

  // Update device service
  async updateDevice(
    id: number,
    updateDeviceDto: UpdateDeviceDto,
    requester: RequsterTypes,
  ): Promise<Omit<Device, 'userId' | 'createdAt'>> {
    const device = await this.prisma.device.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found.`)
    }

    if (requester.role !== 'ADMIN' && device.userId !== requester.id) {
      throw new ForbiddenException(
        'Access denied. Only the creator user of this device or an admin can update it.',
      )
    }

    try {
      return await this.prisma.device.update({
        where: { id },
        data: {
          ...updateDeviceDto,
        },
        select: {
          id: true,
          name: true,
          number: true,
          type: true,
          category: true,
          description: true,
          updatedAt: true,
          from: true,
          to: true,
          user: { select: { id: true, name: true, phone: true, email: true, avatar: true } },
        },
      })
    } catch (error) {
      console.error('Error updating device:', error)
      throw new InternalServerErrorException('An error occurred while updating the device.')
    }
  }

  // Delete device service
  async deleteDevice(id: number, requester: RequsterTypes): Promise<void> {
    const device = await this.prisma.device.findUnique({
      where: { id },
    })

    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found.`)
    }

    if (requester.role !== 'ADMIN' && device.userId !== requester.id) {
      throw new ForbiddenException(
        'Access denied. Only the creator user of this device or an admin can delete it.',
      )
    }

    try {
      await this.prisma.device.delete({
        where: { id },
      })
    } catch (error) {
      console.error('Error deleting device:', error)
      throw new InternalServerErrorException('An error occurred while deleting the device.')
    }
  }

  // Get by id device service
  async getDeviceById(id: number): Promise<Omit<Device, 'userId'>> {
    const device = await this.prisma.device.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        number: true,
        type: true,
        category: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        from: true,
        to: true,
        user: { select: { id: true, name: true, phone: true, email: true, avatar: true } },
      },
    })

    if (!device) {
      throw new NotFoundException('Device not found.')
    }

    return device
  }

  // Get all devices service
  async getAllDevices(skip: number = 0, take: number = 10): Promise<Omit<Device, 'userId'>[]> {
    try {
      return await this.prisma.device.findMany({
        skip,
        take,
        select: {
          id: true,
          name: true,
          number: true,
          type: true,
          category: true,
          description: true,
          createdAt: true,
          updatedAt: true,
          from: true,
          to: true,
          user: { select: { id: true, name: true, phone: true, email: true, avatar: true } },
        },
      })
    } catch (error) {
      console.error('Error fetching devices:', error)
      throw new InternalServerErrorException('An error occurred while fetching devices.')
    }
  }
}
