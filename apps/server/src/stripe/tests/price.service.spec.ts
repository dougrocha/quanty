import { Test, TestingModule } from '@nestjs/testing'

import { PricesService } from '../services/prices.service'

describe('PricesService', () => {
  let service: PricesService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PricesService],
    }).compile()

    service = module.get<PricesService>(PricesService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
