import { Inject, Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-discord'

import { AUTH_SERVICE } from '../../common'
import { IAuthenticationService } from '../interfaces/auth'

@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AUTH_SERVICE)
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
    const { discriminator, id, username, email, avatar, locale } = profile

    const details = {
      id,
      username,
      discriminator,
      email,
      avatar: avatar ?? undefined,
      // Not in schema, most likely dont need it
      // verified,
      locale,
      refreshToken,
      accessToken,
    }

    return this.authService.validateUser(details)
  }
}
