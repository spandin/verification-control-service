import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { WakeUpModule } from './wake-up/wake-up.module'
import { SpecModule } from './spec/spec.module'
import { DevicesModule } from './devices/devices.module'
import { RoleModule } from './role/role.module'
import { UsersModule } from './users/users.module'

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
    UsersModule,
  ],
})
export class AppModule {}
