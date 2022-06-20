import { Test, TestingModule } from '@nestjs/testing'

import { PriceService } from '../services/prices.service'

describe('PriceService', () => {
  let service: PriceService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PriceService],
    }).compile()

    service = module.get<PriceService>(PriceService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
