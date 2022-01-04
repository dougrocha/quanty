import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-discord'

import { IAuthenticationProvider } from '../interfaces/auth'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: IAuthenticationProvider,
  ) {
    super({
      clientID: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.DISCORD_CALLBACK_URL,
      scope: ['email', 'identify', 'guilds'],
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { discriminator, id: discordId, avatar, username, email } = profile

    const details = {
      discordId,
      username,
      discriminator,
      avatar,
      email,
      refreshToken,
      accessToken,
    }
    return this.authService.validateUser(details)
  }
}
