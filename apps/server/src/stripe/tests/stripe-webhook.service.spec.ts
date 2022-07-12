import { Test, TestingModule } from '@nestjs/testing'

import { StripeWebhookService } from '../services/stripe-webhook.service'

describe('StripeWebhookService', () => {
  let service: StripeWebhookService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeWebhookService],
    }).compile()

    service = module.get<StripeWebhookService>(StripeWebhookService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
