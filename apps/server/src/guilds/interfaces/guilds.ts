import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { GuildDocument } from 'src/schemas'

import { Channel } from '../models/channel'
import { Guild } from '../models/guild'

export interface IGuildsService {
  getGuildConfig(guildId: string): Promise<GuildDocument | null>
  getMutualGuilds(accessToken: string): any
}

export interface IGuildsHttpService {
  fetchUserGuilds(accessToken: string): Promise<AxiosResponse<Guild[]>>
  fetchBotGuilds(): Promise<AxiosResponse<Guild[]>>
  fetchGuild(guildId: string): Observable<AxiosResponse<Guild>>
  fetchGuildChannels(guildId: string): Observable<AxiosResponse<Channel[]>>
}
