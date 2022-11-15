import { Inject, Injectable } from '@nestjs/common'
import { Customer, PrismaClient } from '@prisma/client'

import { User, UserCreateWithoutCustomerInput } from '../../@generated'
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
  }: UserCreateWithoutCustomerInput): Promise<User> {
    const customer = await this.paymentsService.createCustomer(id, email)

    const user = await this.prisma.user.create({
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
    newDetails: UserCreateWithoutCustomerInput,
  ): Promise<User> {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: newDetails,
    })
  }

  async findUser(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    })
  }

  async findCustomer(id: string): Promise<Customer | null> {
    return this.prisma.customer.findUnique({
      where: {
        userId: id,
      },
    })
  }
}
