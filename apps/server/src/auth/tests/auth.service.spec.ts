import { HttpModule } from '@nestjs/axios'
import { getModelToken } from '@nestjs/mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { Users } from '@quanty/schemas'
import { Model } from 'mongoose'
import { UsersService } from 'src/users/services/users.service'

import { AuthService } from '../auth.service'

describe('AuthService', () => {
  let service: AuthService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        AuthService,
        { provide: 'USERS_SERVICE', useClass: UsersService },
        {
          provide: getModelToken(Users.name),
          useValue: Model,
        },
      ],
    }).compile()

    service = module.get<AuthService>(AuthService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
