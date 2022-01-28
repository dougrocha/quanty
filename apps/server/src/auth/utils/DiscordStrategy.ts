import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-discord'

import { IAuthenticationService } from '../interfaces/auth'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: IAuthenticationService,
  ) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ['email', 'identify', 'guilds'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { discriminator, id: discordId, username, email, avatar } = profile

    const details = {
      discordId,
      username,
      discriminator,
      email,
      avatar,
      refreshToken,
      accessToken,
    }
    console.log(details)
    return this.authService.validateUser(details)
  }
}
