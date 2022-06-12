import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Users } from '@quanty/schemas'
import Stripe from 'stripe'

import { STRIPE_CLIENT } from '../../common'
import {
  IPaymentsService,
  PaymentRequestBody,
} from '../interfaces/paymentsService.interface'

@Injectable()
export class PaymentsService implements IPaymentsService {
  constructor(
    @Inject(STRIPE_CLIENT) private readonly stripe: Stripe,
    private configService: ConfigService,
  ) {}

  async createCustomer(discordId: string, email?: string) {
    return this.stripe.customers.create({
      metadata: { discordId },
      email,
    })
  }

  async findCustomer(customerId: string) {
    return this.stripe.customers.retrieve(customerId)
  }

  async deleteCustomer(customerId: string) {
    return this.stripe.customers.del(customerId)
  }

  async updateCustomer(
    customerId: string,
    params?: Stripe.CustomerUpdateParams,
  ) {
    return this.stripe.customers.update(customerId, params)
  }

  async createPaymentIntent(body: PaymentRequestBody, user: Users) {
    return this.stripe.paymentIntents.create({
      amount: Number(body.amount) * 100,
      currency: body.currency,
      payment_method_types: body.payment_method_types,
      customer: user.stripeId,
    })
  }

  async findPaymentIntent(paymentIntentId: string) {
    if (!paymentIntentId) return null

    return this.stripe.paymentIntents.retrieve(paymentIntentId)
  }

  async updatePaymentIntent(
    paymentIntentId: string,
    params?: Stripe.PaymentIntentUpdateParams,
  ) {
    return this.stripe.paymentIntents.update(paymentIntentId, params)
  }

  async confirmPaymentIntent(paymentIntentId: string) {
    return this.stripe.paymentIntents.confirm(paymentIntentId)
  }

  async cancelPaymentIntent(
    paymentIntentId: string,
    reason?: Stripe.PaymentIntentCancelParams.CancellationReason,
  ) {
    return this.stripe.paymentIntents.cancel(paymentIntentId, {
      cancellation_reason: reason,
    })
  }
}
