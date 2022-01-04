import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { AxiosResponse } from 'axios'
import { map, Observable } from 'rxjs'
import { IGuildProvider } from 'src/guild/interfaces/types'
import { Channel } from 'src/guild/models/channel'
import { Guild } from 'src/guild/models/guild'

@Injectable()
export class GuildService implements IGuildProvider {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  fetchGuild(guildId: string): Observable<AxiosResponse<Guild[]>> {
    return this.httpService
      .get(`https://discord.com/api/v9/guilds/${guildId}`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_SECRET}`,
        },
      })
      .pipe(map(response => response.data))
  }

  fetchGuildChannels(guildId: string): Observable<AxiosResponse<Channel[]>> {
    return this.httpService
      .get(`https://discord.com/api/v9/guilds/${guildId}/channels`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_SECRET}`,
        },
      })
      .pipe(map(response => response.data))
  }
}
