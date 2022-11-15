import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import axios, { AxiosResponse } from 'axios'
import { map, Observable } from 'rxjs'

import { Channel, GuildMember, DiscordGuild, DiscordRoles } from '../../common'
import { DISCORD_API_URL } from '../../utils/constants'
import { IGuildsHttpService } from '../interfaces/guilds'

@Injectable()
export class GuildsHttpService implements IGuildsHttpService {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  fetchUserGuilds(accessToken: string): Promise<AxiosResponse<DiscordGuild[]>> {
    return axios.get(`${DISCORD_API_URL}/api/v10/users/@me/guilds`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
  }

  fetchBotGuilds(): Promise<AxiosResponse<DiscordGuild[]>> {
    return axios.get(
      `${DISCORD_API_URL}/api/v10/users/@me/guilds?with_counts=true`,
      {
        headers: {
          Authorization: `Bot ${process.env.BOT_SECRET}`,
        },
      },
    )
  }

  fetchGuild(guildId: string): Observable<AxiosResponse<DiscordGuild>> {
    return this.httpService
      .get(`${DISCORD_API_URL}/api/v10/guilds/${guildId}`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_SECRET}`,
        },
      })
      .pipe(map(response => response.data))
  }

  fetchGuildChannels(guildId: string): Observable<AxiosResponse<Channel[]>> {
    return this.httpService
      .get(`${DISCORD_API_URL}/api/v10/guilds/${guildId}/channels`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_SECRET}`,
        },
      })
      .pipe(map(response => response.data))
  }

  fetchGuildMembers(guildId: string): Observable<AxiosResponse<GuildMember[]>> {
    return this.httpService
      .get(`${DISCORD_API_URL}/api/v10/guilds/${guildId}/members`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_SECRET}`,
        },
      })
      .pipe(map(response => response.data))
  }

  fetchGuildRoles(guildId: string): Observable<AxiosResponse<DiscordRoles[]>> {
    return this.httpService
      .get(`${DISCORD_API_URL}/api/v10/guilds/${guildId}/roles`, {
        headers: {
          Authorization: `Bot ${process.env.BOT_SECRET}`,
        },
      })
      .pipe(map(response => response.data))
  }
}
