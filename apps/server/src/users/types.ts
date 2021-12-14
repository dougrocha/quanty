import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Guild } from 'src/guild/models/guild';

export interface IUsersProvider {
  fetchOwnerGuilds(accessToken: string): Observable<AxiosResponse<Guild[]>>;
}
