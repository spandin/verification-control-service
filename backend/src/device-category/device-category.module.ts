import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { DeviceCategoryController } from './device-category.controller'
import { DeviceCategoryService } from './device-category.service'

@Module({
  imports: [PrismaModule],
  controllers: [DeviceCategoryController],
  providers: [DeviceCategoryService],
})
export class DevicesCategoryModule {}
