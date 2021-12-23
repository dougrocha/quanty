import { Module } from '@nestjs/common'
import { GuildResolver } from './resolvers/guild/guild.resolver'
import { HttpModule } from '@nestjs/axios'
import { GuildsService } from './services/guild/guild.service'

@Module({
  imports: [HttpModule],
  providers: [
    { provide: 'GUILDS_SERVICE', useClass: GuildsService },
    GuildResolver,
  ],
})
export class GuildModule {}
