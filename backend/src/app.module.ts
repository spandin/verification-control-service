import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { DevicesModule } from './devices/devices.module'
import { RoleModule } from './role/role.module'
import { UsersModule } from './users/users.module'
import { WakeUpModule } from './helpers/wake-up/wake-up.module'
import { SpecModule } from './helpers/spec/spec.module'
import { DevicesCategoryModule } from './device-category/device-category.module'
import { DeviceTypeModule } from './device-type/device-type.module'

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    ConfigModule,
    SpecModule,
    WakeUpModule,
    AuthModule,
    DevicesModule,
    RoleModule,
    DevicesCategoryModule,
    DeviceTypeModule,
    UsersModule,
  ],
})
export class AppModule {}
