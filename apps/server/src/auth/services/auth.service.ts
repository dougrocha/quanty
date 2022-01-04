import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { UserDetails } from 'src/common/types'
import { User, UserDocument } from 'src/schemas'

import { IAuthenticationProvider } from '../interfaces/auth'

@Injectable()
export class AuthService implements IAuthenticationProvider {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async validateUser(details: UserDetails): Promise<UserDocument> {
    const { discordId, accessToken, username, discriminator, refreshToken } =
      details
    const user = await this.findUser(discordId)
    if (user) {
      return user.update(
        { username, discriminator, accessToken, refreshToken },
        { new: true },
      )
    }
    return this.createUser(details)
  }

  async createUser(details: UserDetails): Promise<UserDocument> {
    const createdUser = new this.userModel(details)
    return createdUser.save()
  }

  async findUser(discordId: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ discordId })
  }
}
