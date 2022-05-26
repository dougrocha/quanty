import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import {
  IGuildsHttpService,
  IGuildsService,
} from 'src/guilds/interfaces/guilds'
import { GuildDocument, Guilds } from 'src/schemas'

import { Guild } from '../models/guild'

@Injectable()
export class GuildsService implements IGuildsService {
  constructor(
    @InjectModel(Guilds.name) private guildModel: Model<GuildDocument>,
    @Inject('GUILDS_HTTP_SERVICE')
    private readonly guildsHttpService: IGuildsHttpService,
  ) {}

  async getGuildConfig(guildId: string): Promise<GuildDocument | null> {
    return await this.guildModel.findOne({ guildId })
  }

  async getMutualGuilds(accessToken: string) {
    const { data: userGuilds } = await this.guildsHttpService.fetchUserGuilds(
      accessToken,
    )
    const { data: botGuilds } = await this.guildsHttpService.fetchBotGuilds()

    const adminUserGuilds: Guild[] = userGuilds.filter(
      ({ permissions }) => (parseInt(permissions ?? '0') & 0x8) === 0x8,
    )

    adminUserGuilds.filter(guild =>
      botGuilds.some(botGuild =>
        botGuild.id === guild.id ? (guild.bot = true) : (guild.bot = false),
      ),
    )

    return adminUserGuilds
  }
}
