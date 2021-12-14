import { Observable } from 'rxjs';
import { Guild } from './models/guild';
import { AxiosResponse } from 'axios';
import { Channel } from './models/channel';

export interface IGuildsProvider {
  fetchGuild(guildId: string): Observable<AxiosResponse<Guild[]>>;
  fetchGuildChannels(guildId: string): Observable<AxiosResponse<Channel[]>>;
}
