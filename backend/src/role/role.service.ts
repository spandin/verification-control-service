import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { RequsterTypes } from 'types'
import { CreateRoleDto } from './dto/create-role.dto'
import { UpdateRoleDto } from './dto/update-role.dto'

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  // Find all role service
  async findAll(): Promise<CreateRoleDto[]> {
    const roles = await this.prisma.role.findMany()

    if (!roles) {
      throw new NotFoundException('Role not found.')
    }

    try {
      return roles
    } catch (error) {
      console.error('Error fetching role:', error)
      throw new InternalServerErrorException('An error occurred while creating the role.')
    }
  }

  // Delete role service
  async createRole(createRoleDto: CreateRoleDto, requester: RequsterTypes): Promise<CreateRoleDto> {
    if (requester.role !== 'администратор') {
      throw new ForbiddenException('Access denied. Only the admin can delete it.')
    }

    if (!createRoleDto.id) {
      throw new BadRequestException('Role id is required.')
    }

    if (!createRoleDto.name) {
      throw new BadRequestException('Role name is required.')
    }

    const existingRole = await this.prisma.role.findUnique({ where: { name: createRoleDto.name } })
    if (existingRole) {
      throw new BadRequestException(`Role "${createRoleDto.name}" already exists.`)
    }

    try {
      return this.prisma.role.create({ data: createRoleDto })
    } catch (error) {
      console.error('Error creating role:', error)
      throw new InternalServerErrorException('An error occurred while creating the role.')
    }
  }

  // Update role service
  async updateRole(
    id: string,
    updateRoleDto: UpdateRoleDto,
    requester: RequsterTypes,
  ): Promise<UpdateRoleDto> {
    if (requester.role !== 'администратор') {
      throw new ForbiddenException('Access denied. Only the admin can delete it.')
    }

    const role = await this.prisma.role.findUnique({ where: { id } })
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found.`)
    }

    try {
      return this.prisma.role.update({ where: { id }, data: updateRoleDto })
    } catch (error) {
      console.error('Error updating role:', error)
      throw new InternalServerErrorException('An error occurred while updating the role.')
    }
  }

  // Delete role service
  async deleteRole(id: string, requester: RequsterTypes): Promise<void> {
    if (requester.role !== 'администратор') {
      throw new ForbiddenException('Access denied. Only the admin can delete it.')
    }

    const role = await this.prisma.role.findUnique({ where: { id } })
    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found.`)
    }

    try {
      await this.prisma.role.delete({ where: { id } })
    } catch (error) {
      console.error('Error deleting role:', error)
      throw new InternalServerErrorException('An error occurred while deleting the role.')
    }
  }
}
