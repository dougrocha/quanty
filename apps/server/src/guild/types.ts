import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'

import { Channel } from './models/channel'
import { Guild } from './models/guild'

export interface IGuildProvider {
  fetchGuild(guildId: string): Observable<AxiosResponse<Guild[]>>
  fetchGuildChannels(guildId: string): Observable<AxiosResponse<Channel[]>>
}
