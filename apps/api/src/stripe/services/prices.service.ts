import { Inject, Injectable } from '@nestjs/common'
import Stripe from 'stripe'

import { STRIPE_CLIENT } from '../../common'

@Injectable()
export class PricesService {
  constructor(@Inject(STRIPE_CLIENT) private readonly stripe: Stripe) {}

  async listAllPrices() {
    return this.stripe.prices.list({ limit: 10 })
  }

  async listAllActivePrices() {
    return this.stripe.prices.list({ limit: 10, active: true })
  }

  async getPrice(priceId: string) {
    return this.stripe.prices.retrieve(priceId)
  }

  async updatePrice(
    priceId: string,
    updatePriceParams: Stripe.PriceUpdateParams,
  ) {
    return this.stripe.prices.update(priceId, updatePriceParams)
  }
}
