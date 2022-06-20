import { Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import Stripe from 'stripe'

import {
  GqlThrottlerGuard,
  GraphQLAuthGuard,
  SUBSCRIPTION_SERVICE,
} from '../../common'
import { CreateSubscriptionInput } from '../dtos/createSubscription.dto'
import { ISubscriptionService } from '../interfaces/subscriptionService.interface'
import { CancelSubscription } from '../models/cancel-subscription.model'
import { CreateSubscription } from '../models/createSubscription.model'

@Resolver()
@UseGuards(GraphQLAuthGuard, GqlThrottlerGuard)
export class SubscriptionsResolver {
  constructor(
    @Inject(SUBSCRIPTION_SERVICE)
    private readonly subscriptionService: ISubscriptionService,
  ) {}

  @Mutation(() => CreateSubscription)
  async createSubscription(
    @Args('newSubscriptionParams') input: CreateSubscriptionInput,
  ): Promise<CreateSubscription> {
    const subscription = await this.subscriptionService.createSubscription(
      input.customerId,
      input.priceId,
    )

    const { payment_intent } = subscription.latest_invoice as Stripe.Invoice

    return {
      id: subscription.id,
      client_secret:
        (payment_intent as Stripe.PaymentIntent).client_secret ?? '',
    }
  }

  @Mutation(() => CancelSubscription)
  async cancelSubscription(
    @Args('subscriptionId') subscriptionId: string,
  ): Promise<CancelSubscription> {
    const subscription = await this.subscriptionService.deleteSubscription(
      subscriptionId,
    )

    return {
      id: subscription.id,
      status: subscription.status,
    }
  }
}
