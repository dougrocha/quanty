import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

import {
  Guild,
  GuildPlugins,
  GuildPluginsWhereUniqueInput,
  GuildSettings,
  GuildSettingsWhereUniqueInput,
  GuildWhereUniqueInput,
  UpdateOneGuildArgs,
  UpdateOneGuildPluginsArgs,
} from '../../@generated'
import {
  MutualGuild,
  GuildMember,
  Channel,
  DiscordGuild,
  DiscordRoles,
} from '../../common'

export interface IGuildsService {
  getGuild(query: GuildWhereUniqueInput): Promise<Guild | null>
  updateGuild(query: UpdateOneGuildArgs): Promise<Guild>
  updateGuildPlugins(args: UpdateOneGuildPluginsArgs): Promise<GuildPlugins>

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
  fetchGuildMembers(guildId: string): Observable<AxiosResponse<GuildMember[]>>
  fetchGuildRoles(guildId: string): Observable<AxiosResponse<DiscordRoles[]>>
}
