import { UserDetails } from 'src/common/types'
import { UserDocument } from 'src/schemas'

export interface IAuthenticationService {
  validateUser(user: UserDetails): Promise<UserDocument>
}
