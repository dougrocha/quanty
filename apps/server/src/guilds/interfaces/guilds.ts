import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

import {
  Guilds,
  GuildPlugins,
  GuildPluginsWhereUniqueInput,
  GuildsWhereUniqueInput,
  UpdateOneGuildsArgs,
  UpdateOneGuildPluginsArgs,
  Users,
} from '../../@generated'
import {
  MutualGuild,
  GuildMember,
  Channel,
  DiscordGuild,
  DiscordRoles,
} from '../../common'

export interface IGuildsService {
  getGuild(query: GuildsWhereUniqueInput): Promise<Guilds | null>
  getGuildPlugins(
    query: GuildPluginsWhereUniqueInput,
  ): Promise<GuildPlugins | null>
  getMutualGuilds(user: Users): Promise<MutualGuild[]>

  updateGuild(query: UpdateOneGuildsArgs): Promise<Guilds>
  updateGuildPlugins(args: UpdateOneGuildPluginsArgs): Promise<GuildPlugins>
}

export interface IGuildsHttpService {
  fetchUserGuilds(accessToken: string): Promise<AxiosResponse<DiscordGuild[]>>
  fetchBotGuilds(): Promise<AxiosResponse<DiscordGuild[]>>
  fetchGuild(guildId: string): Observable<AxiosResponse<DiscordGuild>>
  fetchGuildChannels(guildId: string): Observable<AxiosResponse<Channel[]>>
  fetchGuildMembers(guildId: string): Observable<AxiosResponse<GuildMember[]>>
  fetchGuildRoles(guildId: string): Observable<AxiosResponse<DiscordRoles[]>>
}
