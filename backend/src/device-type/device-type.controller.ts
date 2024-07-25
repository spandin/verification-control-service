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
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Auth } from 'src/auth/auth.decorator'
import { CreateDeviceTypeDto } from './dto/create-device-type.dto'
import { UpdateDeviceTypeDto } from './dto/update-device-type.dto'
import { DeviceTypeService } from './device-type.service'

@ApiTags('device-types')
@Controller('device-types')
export class DeviceTypeController {
  constructor(private readonly deviceTypeService: DeviceTypeService) {}

  @Get()
  @Auth()
  @ApiOperation({ summary: 'Get all device types' })
  @ApiResponse({ status: 200, description: 'Return all device types.' })
  @ApiResponse({ status: 404, description: 'Device types not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findAll(): Promise<CreateDeviceTypeDto[]> {
    try {
      return this.deviceTypeService.findAll()
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
  @ApiOperation({ summary: 'Get device type by ID' })
  @ApiResponse({ status: 200, description: 'Return device type by ID.' })
  @ApiResponse({ status: 404, description: 'Device type not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async findOne(@Param('id') id: string) {
    try {
      return this.deviceTypeService.findOne(id)
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
  @ApiOperation({ summary: 'Create a new device type' })
  @ApiBody({ type: CreateDeviceTypeDto })
  @ApiResponse({ status: 201, description: 'The device type has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async create(
    @Body() createDeviceTypeDto: CreateDeviceTypeDto,
    @Req() req,
  ): Promise<CreateDeviceTypeDto> {
    const requester = req.user

    try {
      return this.deviceTypeService.createDeviceType(createDeviceTypeDto, requester)
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
  @ApiOperation({ summary: 'Update a device type by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateDeviceTypeDto })
  @ApiResponse({ status: 200, description: 'The device type has been successfully updated.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Device type not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async update(
    @Param('id') id: string,
    @Body() updateDeviceTypeDto: UpdateDeviceTypeDto,
    @Req() req,
  ): Promise<UpdateDeviceTypeDto> {
    const requester = req.user

    try {
      return this.deviceTypeService.updateDeviceType(id, updateDeviceTypeDto, requester)
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
  @ApiOperation({ summary: 'Delete a device type by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'The device type has been successfully deleted.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'Device type not found.' })
  @ApiResponse({ status: 500, description: 'Internal server error.' })
  async remove(@Param('id') id: string, @Req() req): Promise<void> {
    const requester = req.user

    try {
      return this.deviceTypeService.deleteDeviceType(id, requester)
    } catch (error) {
      if (error instanceof HttpException) {
        throw error
      } else {
        throw new HttpException('Internal Server Error.', HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }
  }
}
