import { GuildDocument } from '@quanty/schemas'
import * as Args from 'src/guilds/dto/args'

export interface IGuildConfigProvider {
  getGuild(GetGuildIdArgs: Args.GetGuildIdArgs): Promise<GuildDocument | null>
}

export enum GuildEventsEnum {}
