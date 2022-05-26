import { UserDetails } from 'src/common/types'
import { UserDocument } from 'src/schemas'

export interface IUsersService {
  createUser(details: UserDetails): Promise<UserDocument>
  updateUser(user: UserDocument, newDetails: UserDetails): Promise<UserDocument>
  findUser(discordId: string): Promise<UserDocument | null>
}
