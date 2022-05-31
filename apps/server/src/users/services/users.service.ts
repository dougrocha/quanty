import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Users, UsersDocument } from '@quanty/schemas'
import { Model } from 'mongoose'
import { IUsersService } from 'src/users/interfaces/users'

import { UserWithToken } from '../../common'

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async createUser(details: UserWithToken): Promise<UsersDocument> {
    const user = await this.userModel.create(details)
    return user.save()
  }

  async updateUser(
    user: UserWithToken,
    newDetails: UserWithToken,
  ): Promise<UsersDocument> {
    return await this.userModel.findOneAndUpdate(
      { discordId: user.discordId },
      newDetails,
      { new: true, upsert: true },
    )
  }

  async findUser(discordId: string): Promise<UsersDocument | null> {
    return await this.userModel.findOne({ discordId })
  }
}
