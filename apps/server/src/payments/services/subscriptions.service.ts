import { Inject, Injectable } from '@nestjs/common'
import Stripe from 'stripe'

import { STRIPE_CLIENT } from '../../common'
import { ISubscriptionService } from '../interfaces/subscriptionService.interface'

@Injectable()
export class SubscriptionsService implements ISubscriptionService {
  constructor(@Inject(STRIPE_CLIENT) private readonly stripe: Stripe) {}

  async createSubscription(customerId: string, planId: string) {
    return this.stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: planId,
        },
      ],
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    })
  }

  async updateSubscription(
    subscriptionId: string,
    data: Stripe.SubscriptionUpdateParams | undefined,
  ) {
    return this.stripe.subscriptions.update(subscriptionId, data)
  }

  async findSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.retrieve(subscriptionId)
  }

  async deleteSubscription(subscriptionId: string) {
    return this.stripe.subscriptions.del(subscriptionId)
  }
}
