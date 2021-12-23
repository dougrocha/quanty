import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from 'src/schemas'
import { UserDetails } from 'src/common/types'
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
      return await user.update(
        { username, discriminator, avatar, accessToken, refreshToken },
        { new: true },
      )
    }
    return this.createUser(details)
  }

  async createUser(details: UserDetails): Promise<UserDocument> {
    const createdUser = new this.userModel(details)
    return await createdUser.save()
  }

  async findUser(discordID: string): Promise<UserDocument | null> {
    return await this.userModel.findOne({ discordID })
  }
}
