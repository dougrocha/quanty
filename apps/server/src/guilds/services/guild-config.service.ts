import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { GuildDocument, Guilds } from '@quanty/schemas'
import { Model } from 'mongoose'
import * as Args from 'src/guilds/dto/args'
import { IGuildConfigProvider } from 'src/guilds/interfaces/types'

@Injectable()
export class GuildConfigService implements IGuildConfigProvider {
  constructor(
    @InjectModel(Guilds.name) private guildModel: Model<GuildDocument>,
  ) {}

  async getGuild({ guildId }: Args.GetGuildIdArgs) {
    return this.guildModel.findOne({ guildId }, { _id: 0, __v: 0 })
  }
}
