import { HttpModule } from '@nestjs/axios'
import { CacheModule, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
  GuildPlugins,
  GuildPluginsSchema,
  Guilds,
  GuildsSchema,
  GuildTickets,
  GuildTicketsSchema,
} from '@quanty/schemas'

import { GuildConfigResolver } from './resolvers/guild-config.resolver'
import { GuildsResolver } from './resolvers/guilds.resolver'
import { GuildConfigService } from './services/guild-config.service'
import { GuildsHttpService } from './services/guilds-http.service'
import { GuildsService } from './services/guilds.service'
import { GuildServiceGateway } from './websocket/guild-service.gateway'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Guilds.name, schema: GuildsSchema }]),
    MongooseModule.forFeature([
      { name: GuildPlugins.name, schema: GuildPluginsSchema },
    ]),
    MongooseModule.forFeature([
      { name: GuildTickets.name, schema: GuildTicketsSchema },
    ]),
    CacheModule.register({ isGlobal: true, ttl: 30 }),
  ],
  providers: [
    { provide: 'GUILD_CONFIG_SERVICE', useClass: GuildConfigService },
    { provide: 'GUILDS_HTTP_SERVICE', useClass: GuildsHttpService },
    { provide: 'GUILDS_SERVICE', useClass: GuildsService },
    GuildsResolver,
    GuildConfigResolver,
    GuildServiceGateway,
  ],
})
export class GuildsModule {}
