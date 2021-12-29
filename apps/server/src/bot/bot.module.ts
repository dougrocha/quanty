import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Guilds, GuildSchema } from 'src/schemas'

import { GuildConfigResolver } from './resolvers/guild-config/guild-config.resolver'
import { GuildConfigService } from './services/guild-config/guild-config.service'
import { GuildServiceGateway } from './websocket/guild-service.gateway'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Guilds.name, schema: GuildSchema }]),
  ],
  providers: [
    { provide: 'GUILD_CONFIG_SERVICE', useClass: GuildConfigService },
    GuildConfigResolver,
    GuildServiceGateway,
  ],
})
export class BotModule {}
