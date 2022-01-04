import { AxiosResponse } from 'axios'
import { Observable } from 'rxjs'
import { UserDetails } from 'src/common/types'
import { Guild } from 'src/guilds/models/guild'
import { UserDocument } from 'src/schemas'

export interface IUsersService {
  createUser(details: UserDetails): Promise<UserDocument>
  updateUser(user: UserDocument, newDetails: UserDetails): Promise<UserDocument>
  findUser(discordId: string): Promise<UserDocument | null>
  fetchOwnerGuilds(accessToken: string): Observable<AxiosResponse<Guild[]>>
}
