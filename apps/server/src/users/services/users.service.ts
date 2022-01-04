import { HttpService } from '@nestjs/axios'
import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { AxiosResponse } from 'axios'
import { Model } from 'mongoose'
import { Observable, map } from 'rxjs'
import { UserDetails } from 'src/common/types'
import { Guild } from 'src/guilds/models/guild'
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

  fetchOwnerGuilds(accessToken: string): Observable<AxiosResponse<Guild[]>> {
    return this.httpService
      .get('https://discord.com/api/v9/users/@me/guilds', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(
        map(response =>
          response.data.filter((guild: Guild) => guild.owner === true),
        ),
      )
  }
}
