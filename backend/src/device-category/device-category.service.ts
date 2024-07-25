import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RequsterTypes } from 'types'
import { CreateDeviceCategoryDto } from './dto/create-device-category.dto'
import { UpdateDeviceCategoryDto } from './dto/update-device-category.dto'

@Injectable()
export class DeviceCategoryService {
  constructor(private prisma: PrismaService) {}

  // Get all device categories
  async getAll(): Promise<CreateDeviceCategoryDto[]> {
    const deviceCategories = await this.prisma.deviceCategory.findMany()

    if (!deviceCategories) {
      throw new NotFoundException('Device category not found.')
    }

    try {
      return deviceCategories
    } catch (error) {
      console.error('Error fetching device category:', error)
      throw new InternalServerErrorException('An error occurred while creating the role.')
    }
  }

  // Find one device categories
  async getById(id: string): Promise<UpdateDeviceCategoryDto> {
    const deviceCategory = await this.prisma.deviceCategory.findUnique({
      where: { id },
      select: { name: true },
    })

    if (!deviceCategory) {
      throw new NotFoundException(`Device category with ID ${id} not found`)
    }

    try {
      return deviceCategory
    } catch (error) {
      console.error('Error fetching device category:', error)
      throw new InternalServerErrorException('An error occurred while creating the role.')
    }
  }

  // Find all devices by categories
  async getAllDevicesWithCategory(categoryId: string) {
    const deviceCategory = await this.prisma.deviceCategory.findUnique({
      where: { id: categoryId },
      include: {
        devices: {
          select: {
            id: true,
            name: true,
            number: true,
            type: { select: { id: true, name: true } },
            organization: { select: { id: true, name: true } },
          },
        },
      },
    })

    if (!deviceCategory) {
      throw new NotFoundException(`Device category with ID ${categoryId} not found.`)
    }

    try {
      return deviceCategory.devices
    } catch (error) {
      console.error('Error fetching devices by category:', error)
      throw new InternalServerErrorException(
        'An error occurred while fetching devices by category.',
      )
    }
  }

  // Create device category
  async createDeviceCategory(
    createDeviceCategory: CreateDeviceCategoryDto,
    requester: RequsterTypes,
  ): Promise<CreateDeviceCategoryDto> {
    if (requester.role !== 'администратор') {
      throw new ForbiddenException('Access denied. Only the admin can create it.')
    }

    if (!createDeviceCategory.id) {
      throw new BadRequestException('Device category id is required.')
    }

    if (!createDeviceCategory.name) {
      throw new BadRequestException('Device category name is required.')
    }

    const existingDeviceCategory = await this.prisma.deviceCategory.findUnique({
      where: { name: createDeviceCategory.name },
    })

    if (existingDeviceCategory) {
      throw new BadRequestException(
        `Device category "${createDeviceCategory.name}" already exists.`,
      )
    }

    try {
      return this.prisma.deviceCategory.create({ data: createDeviceCategory })
    } catch (error) {
      console.error('Error creating device category:', error)
      throw new InternalServerErrorException(
        'An error occurred while creating the device category.',
      )
    }
  }

  // Update device category
  async updateDeviceCategory(id: string, data: UpdateDeviceCategoryDto, requester: RequsterTypes) {
    if (requester.role !== 'администратор') {
      throw new ForbiddenException('Access denied. Only the admin can update it.')
    }

    const deviceCategory = await this.prisma.deviceCategory.findUnique({ where: { id } })
    if (!deviceCategory) {
      throw new NotFoundException(`Device category with ID "${id}" not found.`)
    }

    try {
      return this.prisma.deviceCategory.update({ where: { id }, data })
    } catch (error) {
      console.error('Error updating device category:', error)
      throw new InternalServerErrorException(
        'An error occurred while updating the device category.',
      )
    }
  }

  // Delete device category
  async deleteDeviceCategory(id: string, requester: RequsterTypes): Promise<void> {
    if (requester.role !== 'администратор') {
      throw new ForbiddenException('Access denied. Only the admin can delete it.')
    }

    const deviceCategory = await this.prisma.deviceCategory.findUnique({ where: { id } })
    if (!deviceCategory) {
      throw new NotFoundException(`Device category with ID "${id}" not found.`)
    }

    try {
      await this.prisma.deviceCategory.delete({ where: { id } })
    } catch (error) {
      console.error('Error deleting device category:', error)
      throw new InternalServerErrorException('An error occurred while deleting the role.')
    }
  }
}
