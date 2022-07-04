import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { PriceType } from '../prisma/price-type.enum'

@ObjectType()
export class PriceMaxAggregate {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  recurringInterval?: string

  @Field(() => Int, { nullable: true })
  unit_amount?: number

  @Field(() => String, { nullable: true })
  currency?: string

  @Field(() => PriceType, { nullable: true })
  type?: keyof typeof PriceType

  @Field(() => String, { nullable: true })
  productId?: string
}
