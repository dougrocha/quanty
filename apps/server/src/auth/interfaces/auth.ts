import { UsersDocument } from '@quanty/schemas'

import { UserWithToken } from '../../common'

export interface IAuthenticationService {
  validateUser(user: UserWithToken): Promise<UsersDocument>
}
