import { Controller, Get } from '@nestjs/common'
import { HealthCheckService, HealthCheck } from '@nestjs/terminus'

import { BotHealthIndicator } from './bot.health'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private botHealthIndicator: BotHealthIndicator,
  ) {}

  /**
   * GET /api/health
   *
   * This is a health check endpoint that can be used to check if the API is up and running.
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.botHealthIndicator.isHealthy('quanty-bot'),
    ])
  }
}
