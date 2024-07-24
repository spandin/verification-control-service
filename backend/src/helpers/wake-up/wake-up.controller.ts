import { Controller, Get, Logger } from '@nestjs/common'

@Controller('wakeup')
export class WakeUpController {
  private readonly logger = new Logger(WakeUpController.name)

  @Get()
  wakeUp() {
    this.logger.log('Server woke up!')
    return 'Server is awake!'
  }
}
