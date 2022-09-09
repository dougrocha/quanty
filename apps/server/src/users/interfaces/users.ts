import {
  UsersCreateWithoutCustomerInput,
  Users,
  Customers,
} from '../../@generated'

export interface IUsersService {
  createUser(details: UsersCreateWithoutCustomerInput): Promise<Users>
  updateUser(
    discordId: string,
    newDetails: UsersCreateWithoutCustomerInput,
  ): Promise<Users>
  findUser(discordId: string): Promise<Users | null>

  findCustomer(id: string): Promise<Customers | null>
}
