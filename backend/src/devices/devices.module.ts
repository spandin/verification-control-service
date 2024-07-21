import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { DevicesService } from './devices.service'
import { DevicesController } from './devices.controller'

@Module({
  imports: [PrismaModule],
  controllers: [DevicesController],
  providers: [DevicesService],
})
export class DevicesModule {}
