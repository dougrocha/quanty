import { UsersDocument } from '@quanty/schemas'

import { UserWithToken } from '../../common'

export interface CreateStripeCustomerDTO {
  discordId: string
  name: string
  email: string
}

export interface ChargeCustomerDTO {
  amount: number
  paymentMethodId: string
}

export interface IUsersService {
  createUser(details: UserWithToken): Promise<UsersDocument>
  updateUser(
    discordId: string,
    newDetails: UserWithToken,
  ): Promise<UsersDocument>
  findUser(discordId: string): Promise<UsersDocument | null>
  updateSubscriptionStatus(
    customerId: string,
    subscriptionStatus: string,
  ): Promise<void>
}

export interface IStripeUsersService {
  createStripeCustomer(
    customer: CreateStripeCustomerDTO,
  ): Promise<UsersDocument | null>
}
