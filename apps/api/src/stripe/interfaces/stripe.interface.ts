import Stripe from 'stripe'

export interface IStripeService {
  constructEventFromPayload(
    signature: string,
    payload: Buffer,
  ): Promise<Stripe.Event>
}
