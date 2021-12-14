import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas';
import { UserDetails } from 'src/common/types';
import { IAuthenticationProvider } from '../auth';

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
    } = details;
    const user = await this.userModel.findOne({ discordID });
    if (user) {
      const user = await this.userModel.findOneAndUpdate(
        { discordID },
        { username, discriminator, avatar, accessToken, refreshToken },
      );
      return user;
    }
    return this.createUser(details);
  }

  async createUser(details: UserDetails): Promise<UserDocument> {
    const createdUser = new this.userModel(details);
    return await createdUser.save();
  }

  findUser(discordID: string) {
    return this.userModel.findOne({ discordID });
  }
}
