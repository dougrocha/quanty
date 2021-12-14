import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { GuildConfigService } from 'src/bot/services/guild-config/guild-config.service';
import { Guilds } from 'src/schemas';
import { GuildResolver } from './guild.resolver';

describe('GuildResolver', () => {
  let resolver: GuildResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GuildResolver,
        GuildConfigService,
        {
          provide: getModelToken(Guilds.name),
          useClass: Mock,
        },
      ],
    }).compile();

    resolver = module.get<GuildResolver>(GuildResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

class Mock {
  public async save(): Promise<string> {
    return 'name';
  }
}
