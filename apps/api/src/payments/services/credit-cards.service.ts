import { Inject, Injectable } from '@nestjs/common'
import Stripe from 'stripe'

import { STRIPE_CLIENT } from '../../common'

@Injectable()
export class CreditCardsService {
  constructor(@Inject(STRIPE_CLIENT) private readonly stripe: Stripe) {}

  async addCreditCard(customerId: string, paymentMethodId: string) {
    return this.stripe.setupIntents.create({
      customer: customerId,
      payment_method: paymentMethodId,
    })
  }

  async findCreditCards(customerId: string) {
    return this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    })
  }
}
