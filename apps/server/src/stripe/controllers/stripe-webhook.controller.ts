import {
  BadRequestException,
  Body,
  Controller,
  Headers,
  Inject,
  Post,
  Req,
  Request,
} from '@nestjs/common'
import Stripe from 'stripe'

import { STRIPE_CLIENT, STRIPE_SERVICE, USERS_SERVICE } from '../../common'
import { IUsersService } from '../../users/interfaces/users'
import { IStripeService } from '../interfaces/stripe.interface'

@Controller('webhook')
export class StripeWebhookController {
  constructor(
    @Inject(STRIPE_SERVICE) private readonly stripeService: IStripeService,
    @Inject(USERS_SERVICE) private readonly usersService: IUsersService,
    @Inject(STRIPE_CLIENT) private readonly stripe: Stripe,
  ) {}

  @Post()
  async handleIncomingEvent(
    @Headers('stripe-signature') signature: string,
    @Req() request: Request,
    @Body() rawBody: any,
  ) {
    if (!signature)
      throw new BadRequestException('Missing stripe-signature header')

    const event = await this.stripeService.constructEventFromPayload(
      signature,
      rawBody,
    )

    if (
      event.type === 'customer.subscription.updated' ||
      event.type === 'customer.subscription.created'
    ) {
      const data = event.data.object as Stripe.Subscription

      const customerId: string = data.customer as string
      const subscriptionStatus = data.status

      // Await this.usersService.updateSubscriptionStatus(
      //   customerId,
      //   subscriptionStatus,
      // )
    }

    if (event.type === 'payment_intent.created') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(
        `[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`,
      )
    }
    if (event.type === 'payment_intent.canceled') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(
        `[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`,
      )
    }
    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(
        `[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`,
      )
    }
    if (event.type === 'payment_intent.processing') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(
        `[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`,
      )
    }
    if (event.type === 'payment_intent.requires_action') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(
        `[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`,
      )
    }
    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log(
        `[${event.id}] PaymentIntent (${paymentIntent.id}): ${paymentIntent.status}`,
      )

      const dataObject = event.data.object as any

      if (dataObject['billing_reasons'] == 'subscriptionCreate') {
        const subscriptionId = dataObject['subscription']
        const paymentIntentId = dataObject['payment_intent']

        const payment_intent = await this.stripe.paymentIntents.retrieve(
          paymentIntentId,
        )

        const subscription = await this.stripe.subscriptions.update(
          subscriptionId,
          {
            default_payment_method: payment_intent.payment_method as string,
          },
        )
      }
    }
  }
}
