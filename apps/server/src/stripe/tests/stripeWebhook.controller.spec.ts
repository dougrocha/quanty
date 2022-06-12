import { Test, TestingModule } from '@nestjs/testing'

import { StripeWebhookController } from '../controllers/stripeWebhook.controller'

describe('StripeController', () => {
  let controller: StripeWebhookController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StripeWebhookController],
    }).compile()

    controller = module.get<StripeWebhookController>(StripeWebhookController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
