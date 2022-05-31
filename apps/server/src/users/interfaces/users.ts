import { UsersDocument } from '@quanty/schemas'

import { UserWithToken } from '../../common'

export interface IUsersService {
  createUser(details: UserWithToken): Promise<UsersDocument>
  updateUser(
    user: UsersDocument,
    newDetails: UserWithToken,
  ): Promise<UsersDocument>
  findUser(discordId: string): Promise<UsersDocument | null>
}
