import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import Stripe from 'stripe'

import { STRIPE_CLIENT } from '../../common'
import { IStripeService } from '../interfaces/stripe.interface'

@Injectable()
export class StripeService implements IStripeService {
  constructor(
    @Inject(STRIPE_CLIENT) private readonly stripe: Stripe,
    private configService: ConfigService,
  ) {}

  async constructEventFromPayload(signature: string, payload: Buffer) {
    const webhookSecret = this.configService.get('STRIPE_WEBHOOK_SECRET')

    return this.stripe.webhooks.constructEvent(
      payload,
      signature,
      webhookSecret,
    )
  }
}
