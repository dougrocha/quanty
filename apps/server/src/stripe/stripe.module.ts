import { HttpModule } from '@nestjs/axios'
import { DynamicModule, Module, Provider } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Users, UsersSchema } from '@quanty/schemas'
import { Stripe } from 'stripe'

import { StripeController } from './controllers/stripe.controller'
import { StripeWebhookController } from './controllers/stripeWebhook.controller'
import { StripeService } from './stripe.service'

import {
  PAYMENT_SERVICE,
  STRIPE_CLIENT,
  STRIPE_SERVICE,
  USERS_SERVICE,
} from '../common'
import { PaymentsService } from '../payments/services/payments.service'
import { UsersService } from '../users/services/users.service'

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
  ],
  providers: [
    { provide: STRIPE_SERVICE, useClass: StripeService },
    { provide: USERS_SERVICE, useClass: UsersService },
    { provide: PAYMENT_SERVICE, useClass: PaymentsService },
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
