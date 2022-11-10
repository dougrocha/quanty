import {
  Controller,
  Get,
  HttpStatus,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { Response, Request } from 'express'

import { User } from '../@generated'
import { AuthenticatedGuard, DiscordAuthGuard, HttpUser } from '../common'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  /**
   * GET /api/auth/login
   *
   * This is the route for login.
   */
  @Get('login')
  @UseGuards(DiscordAuthGuard)
  login() {
    return
  }

  /**
   * GET /api/auth/protected
   *
   * This is a page returning the protected status of user auth.
   */
  @Get('protected')
  @UseGuards(AuthenticatedGuard)
  @ApiOkResponse({ description: 'User has been found.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  protected(
    @HttpUser()
    { id, username, discriminator }: User,
    @Res() res: Response,
  ) {
    return res.status(HttpStatus.OK).send({
      loggedIn: true,
      discordId: id,
      username,
      discriminator,
    })
  }

  /**
   * GET /api/auth/logout
   *
   * This will logout the user.
   */
  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.clearCookie('connect.sid')
      res.redirect(process.env.FRONTEND_URL)
      return { msg: 'User had logged out.' }
    })
  }
}
