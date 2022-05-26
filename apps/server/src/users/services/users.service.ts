import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDetails } from 'src/common/types'
import { User, UserDocument } from 'src/schemas'
import { IUsersService } from 'src/users/interfaces/users'

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(HttpService) private readonly httpService: HttpService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async createUser(details: UserDetails): Promise<UserDocument> {
    const user = await this.userModel.create(details)
    return user.save()
  }

  async updateUser(
    user: UserDocument,
    newDetails: UserDetails,
  ): Promise<UserDocument> {
    return await this.userModel.findOneAndUpdate(
      { discordId: user.discordId },
      newDetails,
      { new: true, upsert: true },
    )
  }

  async findUser(discordId: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ discordId })
  }
}
