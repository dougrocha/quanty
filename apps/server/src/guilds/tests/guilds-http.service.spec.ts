import { Test, TestingModule } from '@nestjs/testing'

import { GuildsHttpService } from '../services/guilds-http.service'

describe('GuildsHttpService', () => {
  let service: GuildsHttpService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GuildsHttpService],
    }).compile()

    service = module.get<GuildsHttpService>(GuildsHttpService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
