import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'

import { GuildResolver } from './resolvers/guild/guild.resolver'
import { GuildService } from './services/guild/guild.service'

@Module({
  imports: [HttpModule],
  providers: [
    { provide: 'GUILD_SERVICE', useClass: GuildService },
    GuildResolver,
  ],
})
export class GuildModule {}
