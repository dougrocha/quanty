import { User, UserCreateWithoutCustomerInput } from '../../@generated'

export interface IAuthenticationService {
  validateUser(user: UserCreateWithoutCustomerInput): Promise<User>
}
