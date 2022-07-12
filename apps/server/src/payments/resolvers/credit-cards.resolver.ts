import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

import { User } from '../../@generated/prisma-nestjs-graphql'
import {
  GraphQLAuthGuard,
  GqlThrottlerGuard,
  CREDIT_CARDS_SERVICE,
  GqlUser,
} from '../../common'
import { AddCreditCardInput } from '../inputs/addCreditCard.input'
import { ICreditCardsService } from '../interfaces/creditCardsService.interface'
import { CreatePaymentMethod } from '../models/createPaymentMethod.model'
import { PaymentMethod } from '../models/customerCreditCards.model'

@Resolver()
@UseGuards(GraphQLAuthGuard, GqlThrottlerGuard)
export class CreditCardsResolver {
  constructor(
    @Inject(CREDIT_CARDS_SERVICE)
    private readonly creditCardsService: ICreditCardsService,
  ) {}

  @Query(() => [PaymentMethod], { nullable: true })
  async getPaymentMethods(@GqlUser() user: User) {
    const customerId = user.customer?.id

    if (!customerId) return null

    const creditCards = await this.creditCardsService.findCreditCards(
      customerId,
    )

    return creditCards.data
  }

  @Mutation(() => CreatePaymentMethod)
  async addCreditCard(
    @Args('createCardData') createCardData: AddCreditCardInput,
  ) {
    return await this.creditCardsService.addCreditCards(createCardData)
  }
}
