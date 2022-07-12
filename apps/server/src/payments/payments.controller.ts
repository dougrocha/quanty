import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Logger,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { Request, Response } from 'express'

import {
  IPaymentsService,
  PaymentRequestBody,
} from './interfaces/paymentsService.interface'

import { User } from '../@generated/prisma-nestjs-graphql'
import { AuthenticatedGuard, HttpUser, PAYMENT_SERVICE } from '../common'

@Controller('payments')
@UseGuards(AuthenticatedGuard)
export class PaymentsController {
  private readonly logger = new Logger(PaymentsController.name)

  constructor(
    @Inject(PAYMENT_SERVICE) private paymentService: IPaymentsService,
  ) {}

  /**
   * POST /api/payments/create-intent
   *
   * This will create payment intent for purchases
   *
   * TODO: Upload payment-intent ID onto database.
   */
  @Post('create-intent')
  async createIntent(
    @Req() request: Request,
    @Res() response: Response,
    @Body() body: PaymentRequestBody,
    @HttpUser() user: User,
  ) {
    try {
      const id: string = request.cookies['payment-intent']

      const paymentIntent = await this.paymentService.findPaymentIntent(id)
      if (
        id &&
        paymentIntent &&
        (paymentIntent.status == 'requires_payment_method' ||
          paymentIntent.status == 'processing')
      ) {
        response.status(HttpStatus.OK).json({
          clientSecret: paymentIntent.client_secret,
        })
      } else {
        await this.paymentService
          .createPaymentIntent(body, user)
          .then(res => {
            response
              .status(HttpStatus.CREATED)
              .cookie('payment-intent', res.id, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
                httpOnly: true,
              })
              .json({ clientSecret: res.client_secret })
          })
          .catch(err => {
            this.logger.log(err)
            response.status(HttpStatus.BAD_REQUEST).json(err)
          })
      }
    } catch (err) {
      this.logger.log(err)
      response.status(HttpStatus.BAD_REQUEST).json(err)
    }
  }
}
