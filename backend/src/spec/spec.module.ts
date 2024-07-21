import { Module } from '@nestjs/common'
import { SpecController } from './spec.controller'

@Module({
  controllers: [SpecController],
})
export class SpecModule {}
