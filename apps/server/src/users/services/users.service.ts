import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Users, UsersDocument } from '@quanty/schemas'
import { Model } from 'mongoose'
import { IUsersService } from 'src/users/interfaces/users'

import { PAYMENT_SERVICE, UserWithToken } from '../../common'
import { IPaymentsService } from '../../payments/interfaces/paymentsService.interface'

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: IPaymentsService,
    @InjectModel(Users.name) private userModel: Model<UsersDocument>,
  ) {}

  async createUser(details: UserWithToken): Promise<UsersDocument> {
    const customer = await this.paymentsService.createCustomer(
      details.discordId,
      details.email,
    )
    const user = await this.userModel.create({
      ...details,
      stripeId: customer.id,
    })
    return user.save()
  }

  async updateUser(
    discordId: string,
    newDetails: UserWithToken,
  ): Promise<UsersDocument> {
    return await this.userModel.findOneAndUpdate({ discordId }, newDetails, {
      new: true,
      upsert: true,
    })
  }

  async findUser(discordId: string): Promise<UsersDocument | null> {
    return await this.userModel.findOne({ discordId })
  }

  async updateSubscriptionStatus(
    customerId: string,
    subscriptionStatus: string,
  ) {
    await this.userModel.findOneAndUpdate(
      {
        stripeId: customerId,
      },
      {
        subscriptionStatus,
      },
    )
  }
}
