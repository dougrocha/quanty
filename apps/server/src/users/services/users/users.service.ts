import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { Guild } from 'src/guild/models/guild';
import { IUsersProvider } from 'src/users/types';

@Injectable()
export class UsersService implements IUsersProvider {
  constructor(@Inject(HttpService) private readonly httpService: HttpService) {}

  fetchOwnerGuilds(accessToken: string): Observable<AxiosResponse<Guild[]>> {
    return this.httpService
      .get('https://discord.com/api/v9/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(
        map((response) =>
          response.data.filter((guild: Guild) => guild.owner === true),
        ),
      );
  }
}
