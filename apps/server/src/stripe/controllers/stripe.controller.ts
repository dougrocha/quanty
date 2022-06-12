import { Controller, Get, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'

import { AuthenticatedGuard } from '../../common'

@Controller()
@UseGuards(AuthenticatedGuard)
export class StripeController {
  @Get('config')
  getPublicKey(@Res() response: Response) {
    response.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY })
  }
}
