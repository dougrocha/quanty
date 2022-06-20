import {
  User,
  UserCreateWithoutCustomerInput,
} from '../../@generated/prisma-nestjs-graphql'

export interface IAuthenticationService {
  validateUser(user: UserCreateWithoutCustomerInput): Promise<User>
}
