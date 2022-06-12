import { GuildDocument, GuildPluginsDocument } from '@quanty/schemas'
import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

import { Channel } from '../models/channel'
import { Guild } from '../models/guild'
import { MutualGuild } from '../models/mutualGuilds'

export interface IGuildsService {
  getGuildConfig(guildId: string): Promise<GuildDocument | null>
  getGuildPlugins(id: string): Promise<GuildPluginsDocument | null>
  getMutualGuilds(accessToken: string): Promise<MutualGuild[]>
}

export interface IGuildsHttpService {
  fetchUserGuilds(accessToken: string): Promise<AxiosResponse<Guild[]>>
  fetchBotGuilds(): Promise<AxiosResponse<Guild[]>>
  fetchGuild(guildId: string): Observable<AxiosResponse<Guild>>
  fetchGuildChannels(guildId: string): Observable<AxiosResponse<Channel[]>>
}
