import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HealthCheck } from '@nestjs/terminus'

import { BotHealthIndicator } from './bot.health'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private botHealthIndicator: BotHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.botHealthIndicator.isHealthy('quanty-bot'),
    ])
  }
}

