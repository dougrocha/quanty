import { Users, UsersCreateWithoutCustomerInput } from '../../@generated'

export interface IAuthenticationService {
  validateUser(user: UsersCreateWithoutCustomerInput): Promise<Users>
}
