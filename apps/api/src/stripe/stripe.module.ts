import { HttpModule } from '@nestjs/axios'
import { DynamicModule, Module, Provider } from '@nestjs/common'
import { Stripe } from 'stripe'

import { StripeWebhookController } from './controllers/stripe-webhook.controller'
import { StripeController } from './controllers/stripe.controller'
import { PricesService } from './services/prices.service'
import { ProductsService } from './services/products.service'
import { StripeWebhookService } from './services/stripe-webhook.service'
import { StripeService } from './services/stripe.service'

import {
  PAYMENT_SERVICE,
  STRIPE_CLIENT,
  STRIPE_SERVICE,
  USERS_SERVICE,
  PRISMA_SERVICE,
  PRODUCTS_SERVICE,
  STRIPE_WEBHOOK_SERVICE,
  PRICES_SERVICE,
} from '../common'
import { PaymentsService } from '../payments/services/payments.service'
import { PrismaService } from '../prisma.service'
import { UsersService } from '../users/services/users.service'

@Module({
  imports: [HttpModule],
  providers: [
    { provide: STRIPE_SERVICE, useClass: StripeService },
    { provide: USERS_SERVICE, useClass: UsersService },
    { provide: PAYMENT_SERVICE, useClass: PaymentsService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    { provide: PRODUCTS_SERVICE, useClass: ProductsService },
    { provide: STRIPE_WEBHOOK_SERVICE, useClass: StripeWebhookService },
    { provide: PRICES_SERVICE, useClass: PricesService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
    PricesService,
  ],
  controllers: [StripeWebhookController, StripeController],
})
export class StripeModule {
  static forRoot(apiKey: string, config: Stripe.StripeConfig): DynamicModule {
    const stripe = new Stripe(apiKey, config)

    const stripeProvider: Provider = {
      provide: STRIPE_CLIENT,
      useValue: stripe,
    }

    return {
      module: StripeModule,
      providers: [stripeProvider],
      exports: [stripeProvider],
      global: true,
    }
  }
}
