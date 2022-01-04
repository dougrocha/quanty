import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Guilds, GuildSchema } from 'src/schemas'

import { GuildsResolver } from './resolvers/guilds.resolver'
import { GuildsHttpService } from './services/guilds-http.service'
import { GuildsService } from './services/guilds.service'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Guilds.name, schema: GuildSchema }]),
  ],
  providers: [
    { provide: 'GUILDS_HTTP_SERVICE', useClass: GuildsHttpService },
    { provide: 'GUILDS_SERVICE', useClass: GuildsService },
    GuildsResolver,
  ],
})
export class GuildsModule {}
