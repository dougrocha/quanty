import { Test, TestingModule } from '@nestjs/testing'

import { CreditCardsService } from '../services/credit-cards.service'

describe('CreditCardsService', () => {
  let service: CreditCardsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreditCardsService],
    }).compile()

    service = module.get<CreditCardsService>(CreditCardsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
