import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { Subscription_status } from '../prisma/subscription-status.enum'
import { Guild } from '../guild/guild.model'
import { Customer } from '../customer/customer.model'
import { Price } from '../price/price.model'

@ObjectType()
export class Subscription {
  @Field(() => ID, { nullable: false })
  id!: string

  @Field(() => Subscription_status, {
    nullable: false,
    defaultValue: 'CANCELED',
  })
  status!: keyof typeof Subscription_status

  @Field(() => Date, { nullable: false })
  current_period_end!: Date

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  cancel_at_period_end!: boolean

  @Field(() => Guild, { nullable: false })
  guild?: Guild

  @Field(() => String, { nullable: false })
  guildId!: string

  @Field(() => Customer, { nullable: false })
  customer?: Customer

  @Field(() => String, { nullable: false })
  customerId!: string

  @Field(() => Price, { nullable: false })
  price?: Price

  @Field(() => String, { nullable: false })
  priceId!: string
}
