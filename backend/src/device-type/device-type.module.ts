import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { DeviceTypeController } from './device-type.controller'
import { DeviceTypeService } from './device-type.service'

@Module({
  imports: [PrismaModule],
  controllers: [DeviceTypeController],
  providers: [DeviceTypeService],
})
export class DeviceTypeModule {}
