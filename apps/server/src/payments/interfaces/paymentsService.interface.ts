import Stripe from 'stripe'

import { Users } from '../../@generated'

export interface PaymentRequestBody {
  amount: number
  currency: string
  payment_method_types: Stripe.PaymentMethod.Type[]
}

export interface IPaymentsService {
  createCustomer(
    discordId: string,
    email?: string,
  ): Promise<Stripe.Response<Stripe.Customer>>

  findPaymentIntent(
    paymentIntentId: string,
  ): Promise<Stripe.Response<Stripe.PaymentIntent> | null>

  createPaymentIntent(
    body: PaymentRequestBody,
    user: Users,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>>
}
