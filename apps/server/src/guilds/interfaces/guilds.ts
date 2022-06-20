import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

import {
  Guild,
  GuildPlugins,
  GuildPluginsWhereUniqueInput,
  GuildSettings,
  GuildSettingsWhereUniqueInput,
  GuildWhereUniqueInput,
} from '../../@generated/prisma-nestjs-graphql'
import { Channel } from '../models/channel'
import { DiscordGuild } from '../models/guild'
import { MutualGuild } from '../models/mutualGuilds'

export interface IGuildsService {
  getGuild(query: GuildWhereUniqueInput): Promise<Guild | null>
  getGuildPlugins(
    query: GuildPluginsWhereUniqueInput,
  ): Promise<GuildPlugins | null>
  getGuildSettings(
    query: GuildSettingsWhereUniqueInput,
  ): Promise<GuildSettings | null>
  getMutualGuilds(accessToken: string): Promise<MutualGuild[]>
}

export interface IGuildsHttpService {
  fetchUserGuilds(accessToken: string): Promise<AxiosResponse<DiscordGuild[]>>
  fetchBotGuilds(): Promise<AxiosResponse<DiscordGuild[]>>
  fetchGuild(guildId: string): Observable<AxiosResponse<DiscordGuild>>
  fetchGuildChannels(guildId: string): Observable<AxiosResponse<Channel[]>>
}
