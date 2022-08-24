import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { PubSub } from 'graphql-subscriptions'

import { GuildConfigSubscriptionsResolver } from './resolvers/guild-config-subscriptions.resolver'
import { GuildConfigResolver } from './resolvers/guild-config.resolver'
import { GuildsResolver } from './resolvers/guilds.resolver'
import { GuildsHttpService } from './services/guilds-http.service'
import { GuildsService } from './services/guilds.service'
import { GuildServiceGateway } from './websocket/guild-service.gateway'

import {
  GUILDS_HTTP_SERVICE,
  GUILDS_SERVICE,
  PRISMA_SERVICE,
  PUB_SUB,
} from '../common'
import { PrismaService } from '../prisma.service'

@Module({
  imports: [HttpModule],
  providers: [
    { provide: GUILDS_HTTP_SERVICE, useClass: GuildsHttpService },
    { provide: GUILDS_SERVICE, useClass: GuildsService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: PUB_SUB, useValue: new PubSub() },
    GuildsResolver,
    GuildConfigResolver,
    GuildServiceGateway,
    GuildConfigSubscriptionsResolver,
  ],
  exports: [{ provide: GUILDS_SERVICE, useClass: GuildsService }],
})
export class GuildsModule {}
