import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

import {
  Guild,
  GuildPlugin,
  GuildPluginWhereUniqueInput,
  GuildWhereUniqueInput,
  UpdateOneGuildArgs,
  UpdateOneGuildPluginArgs,
  User,
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
  getGuildPlugins(
    query: GuildPluginWhereUniqueInput,
  ): Promise<GuildPlugin | null>
  getMutualGuilds(user: User): Promise<MutualGuild[]>

  updateGuild(query: UpdateOneGuildArgs): Promise<Guild>
  updateGuildPlugins(args: UpdateOneGuildPluginArgs): Promise<GuildPlugin>
}

export interface IGuildsHttpService {
  fetchUserGuilds(accessToken: string): Promise<AxiosResponse<DiscordGuild[]>>
  fetchBotGuilds(): Promise<AxiosResponse<DiscordGuild[]>>
  fetchGuild(guildId: string): Observable<AxiosResponse<DiscordGuild>>
  fetchGuildChannels(guildId: string): Observable<AxiosResponse<Channel[]>>
  fetchGuildMembers(guildId: string): Observable<AxiosResponse<GuildMember[]>>
  fetchGuildRoles(guildId: string): Observable<AxiosResponse<DiscordRoles[]>>
}
