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
import { Device } from '@prisma/client'
import { UpdateDeviceDto } from './dto/update.dto'

@Injectable()
export class DevicesService {
  constructor(private prisma: PrismaService) {}

  // Create Device Service
  async createDevice(
    createDeviceDto: CreateDeviceDto,
    requester: RequsterTypes,
  ): Promise<Omit<Device, 'userId' | 'updatedAt' | 'typeId' | 'categoryId' | 'organizationId'>> {
    const { name, number, type, category, organization, description, from, to } = createDeviceDto

    if (!name || name.length < 6 || name.length > 32) {
      throw new BadRequestException('Invalid name. Must be between 6 and 32 characters.')
    }
    if (!number || number.length < 5 || number.length > 24) {
      throw new BadRequestException('Invalid number. Must be between 5 and 24 characters.')
    }

    const existingDevice = await this.prisma.device.findFirst({
      where: {
        AND: [{ name }, { number }],
      },
    })
    if (existingDevice) {
      throw new BadRequestException('A device with the same name and number already exists.')
    }

    const deviceType = await this.prisma.deviceType.findUnique({ where: { name: type } })
    if (!deviceType) {
      throw new BadRequestException('Invalid type. Must be a valid DeviceType.')
    }

    const deviceCategory = await this.prisma.deviceCategory.findUnique({
      where: { name: category },
    })
    if (!deviceCategory) {
      throw new BadRequestException('Invalid category. Must be a valid DeviceCategory.')
    }

    const deviceOrganization = await this.prisma.organization.findFirst({
      where: { name: organization },
    })
    if (!deviceOrganization) {
      throw new BadRequestException('Invalid organization. Must be a valid organization.')
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
          description,
          from,
          to,
          type: {
            connect: { id: deviceType.id },
          },
          category: {
            connect: { id: deviceCategory.id },
          },
          organization: {
            connect: { id: deviceOrganization.id },
          },
          user: {
            connect: { id: requester.id },
          },
        },
        select: {
          id: true,
          name: true,
          number: true,
          type: { select: { id: true, name: true } },
          category: { select: { id: true, name: true } },
          organization: { select: { id: true, name: true } },
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
  ): Promise<Omit<Device, 'userId' | 'createdAt' | 'typeId' | 'categoryId' | 'organizationId'>> {
    const device = await this.prisma.device.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!device) {
      throw new NotFoundException(`Device with ID ${id} not found.`)
    }

    if (requester.role !== 'администратор' && device.userId !== requester.id) {
      throw new ForbiddenException(
        'Access denied. Only the creator user of this device or an admin can update it.',
      )
    }

    const updateData: any = {}

    if (updateDeviceDto.type) {
      const deviceType = await this.prisma.deviceType.findUnique({
        where: { name: updateDeviceDto.type },
      })
      if (!deviceType) {
        throw new BadRequestException('Invalid type. Must be a valid DeviceType.')
      }
      updateData.type = { connect: { id: deviceType.id } }
    }

    if (updateDeviceDto.category) {
      const deviceCategory = await this.prisma.deviceCategory.findUnique({
        where: { name: updateDeviceDto.category },
      })
      if (!deviceCategory) {
        throw new BadRequestException('Invalid category. Must be a valid DeviceCategory.')
      }
      updateData.category = { connect: { id: deviceCategory.id } }
    }

    if (updateDeviceDto.name) updateData.name = updateDeviceDto.name
    if (updateDeviceDto.number) updateData.number = updateDeviceDto.number
    if (updateDeviceDto.description !== undefined)
      updateData.description = updateDeviceDto.description
    if (updateDeviceDto.from) updateData.from = new Date(updateDeviceDto.from)
    if (updateDeviceDto.to) updateData.to = new Date(updateDeviceDto.to)

    try {
      return await this.prisma.device.update({
        where: { id },
        data: updateData,
        select: {
          id: true,
          name: true,
          number: true,
          type: { select: { id: true, name: true } },
          category: { select: { id: true, name: true } },
          organization: { select: { id: true, name: true } },
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

    if (requester.role !== 'администратор' && device.userId !== requester.id) {
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
  async getDeviceById(
    id: number,
  ): Promise<Omit<Device, 'userId' | 'typeId' | 'categoryId' | 'organizationId'>> {
    const device = await this.prisma.device.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        number: true,
        type: { select: { id: true, name: true } },
        category: { select: { id: true, name: true } },
        organization: { select: { id: true, name: true } },
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
  async getAllDevices(): Promise<
    Omit<Device, 'userId' | 'typeId' | 'categoryId' | 'description' | 'organizationId'>[]
  > {
    try {
      return await this.prisma.device.findMany({
        select: {
          id: true,
          name: true,
          number: true,
          type: { select: { id: true, name: true } },
          category: { select: { id: true, name: true } },
          organization: { select: { id: true, name: true } },
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
