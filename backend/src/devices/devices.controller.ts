import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { DevicesService } from './devices.service'
import { CreateDeviceDto } from './dto/create.dto'
import { UpdateDeviceDto } from './dto/update.dto'
import { GetDeviceById } from './dto/get-by-id.dto'

@ApiTags('devices')
@Controller('devices')
export class DevicesController {
  constructor(private readonly deviceService: DevicesService) {}

  @Post('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Create a new device' })
  @ApiResponse({
    status: 201,
    description: 'The divece has been successfully created.',
    type: CreateDeviceDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async create(@Body() createPublicationDto: CreateDeviceDto, @Req() req): Promise<any> {
    const requester = req.user

    try {
      return await this.deviceService.createDevice(createPublicationDto, requester)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Put('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Update a device' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the device to update.',
  })
  @ApiResponse({
    status: 200,
    description: 'Device updated successfully.',
    type: UpdateDeviceDto,
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Device or user not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async updatePublication(
    @Param('id') id: string,
    @Body() updatePublicationDto: UpdateDeviceDto,
    @Req() req,
  ): Promise<any> {
    const requester = req.user

    try {
      return await this.deviceService.updateDevice(parseInt(id), updatePublicationDto, requester)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal server error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Delete a device' })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'ID of the device to delete.',
  })
  @ApiResponse({
    status: 200,
    description: 'Device deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Device not found.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async delete(@Param('id') id: string, @Req() req): Promise<{ message: string }> {
    const requester = req.user

    try {
      await this.deviceService.deleteDevice(parseInt(id), requester)

      return { message: 'Device deleted successfully.' }
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get device by ID' })
  @ApiResponse({ status: 200, description: 'The device data.', type: GetDeviceById })
  @ApiResponse({ status: 404, description: 'Device not found.' })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async getPublication(@Param('id') id: string): Promise<any> {
    try {
      return await this.deviceService.getDeviceById(parseInt(id))
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }

  @Get('')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get all devices' })
  @ApiResponse({
    status: 200,
    description: 'List of devices.',
    type: [GetDeviceById],
  })
  @ApiResponse({ status: 500, description: 'Internal Server Error.' })
  async getAll(): Promise<any> {
    try {
      return await this.deviceService.getAllDevices()
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
