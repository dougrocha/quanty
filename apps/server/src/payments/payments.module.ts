import { Module } from '@nestjs/common'

import { PaymentsController } from './payments.controller'
import { CreditCardsResolver } from './resolvers/credit-cards.resolver'
import { SubscriptionsResolver } from './resolvers/subscriptions.resolver'
import { CreditCardsService } from './services/credit-cards.service'
import { PaymentsService } from './services/payments.service'
import { SubscriptionsService } from './services/subscriptions.service'

import {
  PAYMENT_SERVICE,
  CREDIT_CARDS_SERVICE,
  SUBSCRIPTION_SERVICE,
  PRISMA_SERVICE,
} from '../common'
import { PrismaService } from '../prisma.service'

@Module({
  providers: [
    { provide: PAYMENT_SERVICE, useClass: PaymentsService },
    { provide: CREDIT_CARDS_SERVICE, useClass: CreditCardsService },
    CreditCardsResolver,
    SubscriptionsResolver,
    { provide: SUBSCRIPTION_SERVICE, useClass: SubscriptionsService },
    { provide: PRISMA_SERVICE, useClass: PrismaService },
  ],
  exports: [{ provide: PAYMENT_SERVICE, useClass: PaymentsService }],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
