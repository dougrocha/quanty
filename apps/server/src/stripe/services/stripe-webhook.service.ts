import { Injectable } from '@nestjs/common'

import { IStripeWebhookService } from '../interfaces/stripe-webhook.interface'

@Injectable()
export class StripeWebhookService implements IStripeWebhookService {
  handleSubscriptionCreate(): void {
    throw new Error('Method not implemented.')
  }
  handleSubscriptionBilling(): void {
    throw new Error('Method not implemented.')
  }
  handleRefund(): void {
    throw new Error('Method not implemented.')
  }
  handlePaymentCreation(): void {
    throw new Error('Method not implemented.')
  }
  handlePaymentConfirm(): void {
    throw new Error('Method not implemented.')
  }
}
