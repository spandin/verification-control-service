import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Cron, CronExpression } from '@nestjs/schedule'
import axios from 'axios'

@Injectable()
export class WakeUpService {
  constructor(private readonly configService: ConfigService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async wakeUpServer() {
    try {
      await axios.get(`${this.configService.get<string>('HOST')}/wakeup`)
      console.log('Server has been woken up!')
    } catch (error) {
      console.error('Failed to wake up the server:', error)
    }
  }
}
