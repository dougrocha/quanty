import Stripe from 'stripe'

import { AddCreditCardInput } from '../inputs/addCreditCard.input'

export interface ICreditCardsService {
  addCreditCards(
    createCardData: AddCreditCardInput,
  ): Promise<Stripe.Response<Stripe.SetupIntent>>

  findCreditCards(
    customerId: string,
  ): Stripe.ApiListPromise<Stripe.PaymentMethod>
}
