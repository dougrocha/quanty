import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'

import { BotHealthIndicator } from './bot.health'
import { HealthController } from './health.controller'

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [BotHealthIndicator],
})
export class HealthModule {}
