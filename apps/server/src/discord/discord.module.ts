import { Module } from '@nestjs/common'

import { DiscordController } from './discord.controller'

@Module({
  controllers: [DiscordController],
})
export class DiscordModule {}
