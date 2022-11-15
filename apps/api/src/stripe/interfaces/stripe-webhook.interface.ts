export interface IStripeWebhookService {
  handleSubscriptionCreate(): void

  handleSubscriptionBilling(): void

  handleRefund(): void

  handlePaymentCreation(): void

  handlePaymentConfirm(): void
}
