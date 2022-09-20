import { ForbiddenException, Inject, UseGuards } from '@nestjs/common'
import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { PrismaClient } from '@prisma/client'
import Stripe from 'stripe'

import {
  GqlThrottlerGuard,
  GraphQLAuthGuard,
  PRISMA_SERVICE,
  STRIPE_CLIENT,
  SUBSCRIPTION_SERVICE,
} from '../../common'
import { CreateSubscriptionInput } from '../dtos/createSubscription.dto'
import { ISubscriptionService } from '../interfaces/subscriptionService.interface'
import { CancelSubscription } from '../models/cancel-subscription.model'
import { CreateSubscription } from '../models/createSubscription.model'

@Resolver()
@UseGuards(GraphQLAuthGuard, GqlThrottlerGuard)
export class SubscriptionsResolver {
  constructor(
    @Inject(SUBSCRIPTION_SERVICE)
    private readonly subscriptionService: ISubscriptionService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    @Inject(STRIPE_CLIENT) private readonly stripe: Stripe,
  ) {}

  @Mutation(() => CreateSubscription)
  async createSubscription(
    @Args('newSubscriptionParams') input: CreateSubscriptionInput,
  ): Promise<CreateSubscription> {
    const guildSubscription = await this.prisma.guildSubscription.findUnique({
      where: {
        guildId: input.guildId,
      },
    })

    const customer = await this.prisma.customer.findUnique({
      where: {
        discordId: input.userId,
      },
    })

    if (!customer)
      throw new ForbiddenException('Customer account does not exist')

    const guild = await this.prisma.guild.findUnique({
      where: {
        id: input.guildId,
      },
    })

    if (!guild) throw new ForbiddenException('Quanty cannot find current guild')

    const price = await this.prisma.price.findUnique({
      where: { id: input.priceId },
    })

    if (!price) throw new ForbiddenException('Current product does not exist')

    if (guildSubscription) {
      const existingSubscription =
        await this.subscriptionService.findSubscription(guildSubscription.id, {
          expand: ['latest_invoice.payment_intent'],
        })

      const { payment_intent } =
        existingSubscription.latest_invoice as Stripe.Invoice

      console.log('FOUND SUBSCRIPTION')

      return {
        id: guildSubscription.id,
        client_secret:
          (payment_intent as Stripe.PaymentIntent).client_secret ?? '',
      }
    }

    const subscription = await this.subscriptionService.createSubscription(
      customer.id,
      price.id,
    )

    const { payment_intent } = subscription.latest_invoice as Stripe.Invoice

    console.log('BEFORE SUBSCRIPTION')

    await this.prisma.guildSubscription.create({
      data: {
        id: subscription.id,
        current_period_end: new Date(subscription.current_period_end * 1000),
        cancel_at_period_end: subscription.cancel_at_period_end,
        customer: { connect: { id: customer.id } },
        guild: { connect: { id: guild.id } },
        price: { connect: { id: price.id } },
        status: 'INCOMPLETE',
      },
    })

    return {
      id: subscription.id,
      client_secret:
        (payment_intent as Stripe.PaymentIntent).client_secret ?? '',
    }
  }

  @Mutation(() => CancelSubscription)
  async cancelSubscription(
    @Args('subscriptionId') subscriptionId: string,
  ): Promise<CancelSubscription> {
    const subscription = await this.subscriptionService.deleteSubscription(
      subscriptionId,
    )

    return {
      id: subscription.id,
      status: subscription.status,
    }
  }
}
