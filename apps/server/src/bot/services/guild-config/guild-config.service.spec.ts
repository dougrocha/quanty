import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { GuildDto } from 'src/bot/dto/guild.dto'
import { Guilds } from 'src/schemas'
import { GuildConfigService } from './guild-config.service'

const testCat1 = 'Test Cat 1'
const testBreed1 = 'Test Breed 1'

describe('GuildConfigService', () => {
  let service: GuildConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuildConfigService,
        {
          provide: getModelToken(Guilds.name),
          useValue: {
            find: jest.fn().mockResolvedValue([
              { name: testCat1, breed: testBreed1, age: 4 },
              { name: 'Test Cat 2', breed: 'Test Breed 2', age: 3 },
              { name: 'Test Cat 3', breed: 'Test Breed 3', age: 2 },
            ]),
            findOne: jest.fn().mockImplementation((id: string) =>
              Promise.resolve({
                name: testCat1,
                breed: testBreed1,
                age: 4,
                _id: id,
              }),
            ),
            findOneById: jest
              .fn()
              .mockImplementation((name: string) =>
                Promise.resolve({ name, breed: testBreed1, age: 4 }),
              ),
            insertOne: jest
              .fn()
              .mockImplementation((guild: GuildDto) =>
                Promise.resolve({ _id: 'a uuid', ...guild }),
              ),
            updateOne: jest
              .fn()
              .mockImplementation((guild: GuildDto) =>
                Promise.resolve({ _id: 'a uuid', ...guild }),
              ),
            deleteOne: jest.fn().mockResolvedValue({ deleted: true }),
          },
        },
      ],
    }).compile()

    service = module.get<GuildConfigService>(GuildConfigService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
