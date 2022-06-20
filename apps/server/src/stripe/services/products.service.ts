import { Inject, Injectable } from '@nestjs/common'
import Stripe from 'stripe'

import { STRIPE_CLIENT } from '../../common'

@Injectable()
export class ProductsService {
  constructor(@Inject(STRIPE_CLIENT) private readonly stripe: Stripe) {}

  async listAllProducts() {
    return this.stripe.products.list({ limit: 5 })
  }

  async listAllActiveProducts() {
    return this.stripe.products.list({ limit: 5, active: true })
  }

  async getProduct(productId: string) {
    return this.stripe.products.retrieve(productId)
  }

  async updateProduct(
    productId: string,
    updateProductParams: Stripe.ProductUpdateParams,
  ) {
    return this.stripe.products.update(productId, updateProductParams)
  }
}
