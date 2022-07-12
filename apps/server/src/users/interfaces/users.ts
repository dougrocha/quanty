import {
  UserCreateWithoutCustomerInput,
  User,
  Customer,
} from '../../@generated/prisma-nestjs-graphql'

export interface IUsersService {
  createUser(details: UserCreateWithoutCustomerInput): Promise<User>
  updateUser(
    discordId: string,
    newDetails: UserCreateWithoutCustomerInput,
  ): Promise<User>
  findUser(discordId: string): Promise<User | null>

  findCustomer(id: string): Promise<Customer | null>
}
