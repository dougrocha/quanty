import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common'
import { Response, Request } from 'express'

import { User } from '../@generated/prisma-nestjs-graphql'
import { AuthenticatedGuard, DiscordAuthGuard, HttpUser } from '../common'

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
   * GET /api/auth/redirect
   *
   * This is the redirect after user login is complete and successful.
   */
  @Get('redirect')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    return res.redirect(process.env.FRONTEND_URL)
  }

  /**
   * GET /api/auth/status
   *
   * This is a page returning the status code of user auth.
   */
  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(
    @HttpUser()
    { id }: User,
  ) {
    return {
      loggedIn: true,
      discordId: id,
    }
  }

  /**
   * GET /api/auth/logout
   *
   * This will logout user.
   */
  @Get('logout')
  logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy(() => {
      res.clearCookie('session')
      res.redirect('http://localhost:3000')
    })
  }
}
