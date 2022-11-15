import { Controller, Get, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'

import { DiscordAuthGuard } from '../common'

@Controller('discord')
export class DiscordController {
  /**
   * GET /api/discord/callback
   *
   * This is the redirect after user login is complete and successful.
   */
  @Get('callback')
  @UseGuards(DiscordAuthGuard)
  redirect(@Res() res: Response) {
    return res.redirect(process.env.FRONTEND_URL)
  }
}
