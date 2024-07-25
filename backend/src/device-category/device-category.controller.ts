import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpException,
  HttpStatus,
  Req,
} from '@nestjs/common'
import { DeviceCategoryService } from './device-category.service'
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/auth.decorator'
import { CreateDeviceCategoryDto } from './dto/create-device-category.dto'
import { UpdateDeviceCategoryDto } from './dto/update-device-category.dto'

@ApiTags('device-categories')
@Controller('device-categories')
export class DeviceCategoryController {
  constructor(private readonly deviceCategoryService: DeviceCategoryService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all device category' })
  @ApiResponse({ status: 200, description: 'Return all device category.' })
  @ApiResponse({ status: 404, description: 'Device category not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<CreateDeviceCategoryDto[]> {
    try {
      return this.deviceCategoryService.getAll()
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Get(':id')
  @Auth()
  @ApiOperation({ summary: 'Get device category by ID' })
  @ApiResponse({ status: 200, description: 'Return device category by ID.' })
  @ApiResponse({ status: 404, description: 'Device category not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findOne(@Param('id') id: string) {
    try {
      return this.deviceCategoryService.getById(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Get('get-by-category/:id')
  @Auth()
  @ApiOperation({ summary: 'Get all devices by category ID' })
  @ApiResponse({
    status: 200,
    description: 'Return all devices by category ID.',
  })
  @ApiResponse({ status: 404, description: 'Device category not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async getAllDevicesWithTypes(@Param('id') id: string) {
    try {
      return this.deviceCategoryService.getAllDevicesWithCategory(id)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Post()
  @Auth()
  @ApiOperation({ summary: 'Create a new device category' })
  @ApiBody({ type: CreateDeviceCategoryDto })
  @ApiResponse({ status: 201, description: 'The device category has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(
    @Body() createDeviceCategoryDto: CreateDeviceCategoryDto,
    @Req() req,
  ): Promise<CreateDeviceCategoryDto> {
    const requester = req.user

    try {
      return this.deviceCategoryService.createDeviceCategory(createDeviceCategoryDto, requester)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Put(':id')
  @Auth()
  @ApiOperation({ summary: 'Update a device category by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateDeviceCategoryDto })
  @ApiResponse({ status: 200, description: 'The device category has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Device category not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(
    @Param('id') id: string,
    @Body() updateDeviceCategoryDto: UpdateDeviceCategoryDto,
    @Req() req,
  ): Promise<UpdateDeviceCategoryDto> {
    const requester = req.user

    try {
      return this.deviceCategoryService.updateDeviceCategory(id, updateDeviceCategoryDto, requester)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Delete(':id')
  @Auth()
  @ApiOperation({ summary: 'Delete a device category by id' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'The device category has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Device category not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async remove(@Param('id') id: string, @Req() req): Promise<void> {
    const requester = req.user

    try {
      return this.deviceCategoryService.deleteDeviceCategory(id, requester)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
