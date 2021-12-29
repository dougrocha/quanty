import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDetails } from 'src/common/types'
import { User, UserDocument } from 'src/schemas'

import { IAuthenticationProvider } from '../auth'

@Injectable()
export class AuthService implements IAuthenticationProvider {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(details: UserDetails): Promise<UserDocument> {
    const {
      discordID,
      avatar,
      accessToken,
      username,
      discriminator,
      refreshToken,
    } = details
    const user = await this.userModel.findOne({ discordID })
    if (user) {
      return user.update(
        { username, discriminator, avatar, accessToken, refreshToken },
        { new: true },
      )
    }
    return this.createUser(details)
  }

  async createUser(details: UserDetails): Promise<UserDocument> {
    const createdUser = new this.userModel(details)
    return createdUser.save()
  }

  async findUser(discordID: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ discordID })
  }
}
