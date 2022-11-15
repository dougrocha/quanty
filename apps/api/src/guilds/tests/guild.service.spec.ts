import { HttpModule } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'

import { GuildsHttpService } from '../services/guilds-http.service'
import { GuildsService } from '../services/guilds.service'

describe('GuildService', () => {
  let service: GuildsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
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
