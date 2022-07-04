import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { PriceType } from '../prisma/price-type.enum'
import { PriceCountAggregate } from './price-count-aggregate.output'
import { PriceAvgAggregate } from './price-avg-aggregate.output'
import { PriceSumAggregate } from './price-sum-aggregate.output'
import { PriceMinAggregate } from './price-min-aggregate.output'
import { PriceMaxAggregate } from './price-max-aggregate.output'

@ObjectType()
export class PriceGroupBy {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: true })
  recurringInterval?: string

  @Field(() => Int, { nullable: false })
  unit_amount!: number

  @Field(() => String, { nullable: false })
  currency!: string

  @Field(() => PriceType, { nullable: false })
  type!: keyof typeof PriceType

  @Field(() => String, { nullable: false })
  productId!: string

  @Field(() => PriceCountAggregate, { nullable: true })
  _count?: PriceCountAggregate

  @Field(() => PriceAvgAggregate, { nullable: true })
  _avg?: PriceAvgAggregate

  @Field(() => PriceSumAggregate, { nullable: true })
  _sum?: PriceSumAggregate

  @Field(() => PriceMinAggregate, { nullable: true })
  _min?: PriceMinAggregate

  @Field(() => PriceMaxAggregate, { nullable: true })
  _max?: PriceMaxAggregate
}
