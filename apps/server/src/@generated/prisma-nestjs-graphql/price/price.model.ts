import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { PriceType } from '../prisma/price-type.enum'
import { Product } from '../product/product.model'
import { GuildSubscription } from '../guild-subscription/guild-subscription.model'
import { PriceCount } from './price-count.output'

@ObjectType()
export class Price {
  @Field(() => ID, { nullable: false })
  id!: string

  @Field(() => String, { nullable: true })
  recurringInterval!: string | null

  @Field(() => Int, { nullable: false })
  unit_amount!: number

  @Field(() => String, { nullable: false })
  currency!: string

  @Field(() => PriceType, { nullable: false })
  type!: keyof typeof PriceType

  @Field(() => Product, { nullable: false })
  product?: Product

  @Field(() => String, { nullable: false })
  productId!: string

  @Field(() => [GuildSubscription], { nullable: true })
  subscription?: Array<GuildSubscription>

  @Field(() => PriceCount, { nullable: false })
  _count?: PriceCount
}
