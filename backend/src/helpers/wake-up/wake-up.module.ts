import { Module } from '@nestjs/common'
import { WakeUpController } from './wake-up.controller'
import { ConfigModule } from '@nestjs/config'
import { WakeUpService } from './wake-up.service'

@Module({
  imports: [ConfigModule],
  controllers: [WakeUpController],
  providers: [WakeUpService],
})
export class WakeUpModule {}
