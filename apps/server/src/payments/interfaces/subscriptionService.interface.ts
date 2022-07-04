import Stripe from 'stripe'

export interface ISubscriptionService {
  createSubscription(
    customerId: string,
    planId: string,
  ): Promise<Stripe.Response<Stripe.Subscription>>

  updateSubscription(
    subscriptionId: string,
    data: Stripe.SubscriptionUpdateParams | undefined,
  ): Promise<Stripe.Response<Stripe.Subscription>>

  findSubscription(
    subscriptionId: string,
    params?: Stripe.SubscriptionRetrieveParams,
  ): Promise<Stripe.Response<Stripe.Subscription>>

  deleteSubscription(
    subscriptionId: string,
  ): Promise<Stripe.Response<Stripe.Subscription>>
}
