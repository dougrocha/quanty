import { Inject, UseGuards } from '@nestjs/common'
import { Query, Resolver } from '@nestjs/graphql'
import { Users } from '@quanty/schemas'

import { ICreditCardsService } from './interfaces/creditCardsService.interface'
import { PaymentMethod } from './models/customerCreditCards.model'

import {
  GraphQLAuthGuard,
  GqlThrottlerGuard,
  CREDIT_CARDS_SERVICE,
  GqlUser,
} from '../common'

@Resolver()
@UseGuards(GraphQLAuthGuard, GqlThrottlerGuard)
export class CreditCardsResolver {
  constructor(
    @Inject(CREDIT_CARDS_SERVICE)
    private readonly creditCardsService: ICreditCardsService,
  ) {}

  @Query(() => [PaymentMethod], { nullable: true })
  async getPaymentMethods(@GqlUser() user: Users) {
    const customerId = user.stripeId

    if (!customerId) return null

    const creditCards = await this.creditCardsService.findCreditCards(
      customerId,
    )

    return creditCards.data
  }
}
