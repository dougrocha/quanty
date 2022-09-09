import { Inject, Injectable } from '@nestjs/common'
import { Customers, PrismaClient } from '@prisma/client'

import { Users, UsersCreateWithoutCustomerInput } from '../../@generated'
import { PAYMENT_SERVICE, PRISMA_SERVICE } from '../../common'
import { IPaymentsService } from '../../payments/interfaces/paymentsService.interface'
import { IUsersService } from '../interfaces/users'

@Injectable()
export class UsersService implements IUsersService {
  constructor(
    @Inject(PAYMENT_SERVICE) private readonly paymentsService: IPaymentsService,
    @Inject(PRISMA_SERVICE) private readonly prisma: PrismaClient,
  ) {}

  async createUser({
    id,
    discriminator,
    avatar,
    email,
    username,
    locale,
    accessToken,
    refreshToken,
  }: UsersCreateWithoutCustomerInput): Promise<Users> {
    const customer = await this.paymentsService.createCustomer(id, email)

    const user = await this.prisma.users.create({
      data: {
        id,
        discriminator,
        avatar,
        email,
        locale,
        username,
        accessToken,
        refreshToken,
        customer: {
          create: {
            id: customer.id,
            email: customer.email,
          },
        },
      },
    })

    return user
  }

  async updateUser(
    id: string,
    newDetails: UsersCreateWithoutCustomerInput,
  ): Promise<Users> {
    return this.prisma.users.update({
      where: {
        id,
      },
      data: newDetails,
    })
  }

  async findUser(id: string): Promise<Users | null> {
    return this.prisma.users.findUnique({
      where: {
        id,
      },
    })
  }

  async findCustomer(id: string): Promise<Customers | null> {
    return this.prisma.customers.findUnique({
      where: {
        discordId: id,
      },
    })
  }
}
