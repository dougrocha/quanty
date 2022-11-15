import { Controller, Get, Inject, Res, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { PrismaClient } from '@prisma/client'
import { Response } from 'express'
import Stripe from 'stripe'

import {
  PriceCreateManyInput,
  PriceType,
  ProductCreateManyInput,
} from '../../@generated'
import { AuthenticatedGuard, PRISMA_SERVICE, STRIPE_CLIENT } from '../../common'

@ApiTags('Stripe')
@Controller()
@UseGuards(AuthenticatedGuard)
export class StripeController {
  constructor(
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
    @Inject(STRIPE_CLIENT) private readonly stripe: Stripe,
  ) {}
  @Get('config')
  getPublicKey(@Res() response: Response) {
    response.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
  }

  @Get('create-all-stripe')
  async createAll(@Res() response: Response) {
    return response.json({ success: true })

    const stripePrices = await this.stripe.prices.list({
      expand: ['data.product'],
      active: true,
    })

    const priceHolder: PriceCreateManyInput[] = []
    const productHolder: ProductCreateManyInput[] = []

    stripePrices.data.map(
      ({ id, recurring, unit_amount, currency, product, type }, i) => {
        const p = product as Stripe.Product

        if (!unit_amount) return

        type.toUpperCase()

        const newType = (type: Stripe.Price.Type) => {
          if (type == 'one_time') return PriceType.ONE_TIME
          if (type == 'recurring') return PriceType.RECURRING
        }

        productHolder[i] = {
          id: p.id,
          name: p.name,
          description: p.description ?? undefined,
        }

        priceHolder[i] = {
          id,
          currency,
          productId: p.id,
          recurringInterval: recurring?.interval ?? undefined,
          unit_amount,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          type: newType(type)!,
        }
      },
    )

    await this.prisma.product.createMany({
      data: productHolder,
    })

    await this.prisma.price.createMany({
      data: priceHolder,
    })
  }
}
