import { Module } from '@nestjs/common'

import { CreditCardsResolver } from './credit-cards.resolver'
import { PaymentsController } from './payments.controller'
import { CreditCardsService } from './services/credit-cards.service'
import { PaymentsService } from './services/payments.service'

import { PAYMENT_SERVICE, CREDIT_CARDS_SERVICE } from '../common'

@Module({
  providers: [
    { provide: PAYMENT_SERVICE, useClass: PaymentsService },
    { provide: CREDIT_CARDS_SERVICE, useClass: CreditCardsService },
    CreditCardsResolver,
  ],
  exports: [{ provide: PAYMENT_SERVICE, useClass: PaymentsService }],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
