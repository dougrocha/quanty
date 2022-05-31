import { HttpModule } from '@nestjs/axios'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Guilds } from '@quanty/schemas'
import { Model } from 'mongoose'

import { GuildsHttpService } from '../services/guilds-http.service'
import { GuildsService } from '../services/guilds.service'

describe('GuildService', () => {
  let service: GuildsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        {
          provide: getModelToken(Guilds.name),
          useValue: Model,
        },
        { provide: 'GUILDS_HTTP_SERVICE', useClass: GuildsHttpService },
        GuildsService,
      ],
    }).compile()

    service = module.get<GuildsService>(GuildsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
