import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'

import { GuildService } from '../services/guild.service'

describe('GuildService', () => {
  let service: GuildService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [GuildService],
    }).compile()

    service = module.get<GuildService>(GuildService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
