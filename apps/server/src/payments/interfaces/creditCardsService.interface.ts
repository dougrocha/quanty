import Stripe from 'stripe'

export interface ICreditCardsService {
  addCreditCards(customerId: string): any

  findCreditCards(
    customerId: string,
  ): Stripe.ApiListPromise<Stripe.PaymentMethod>
}
