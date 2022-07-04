import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { SubscriptionWhereInput } from './subscription-where.input'
import { Type } from 'class-transformer'
import { SubscriptionOrderByWithRelationInput } from './subscription-order-by-with-relation.input'
import { SubscriptionWhereUniqueInput } from './subscription-where-unique.input'
import { Int } from '@nestjs/graphql'
import { SubscriptionCountAggregateInput } from './subscription-count-aggregate.input'
import { SubscriptionMinAggregateInput } from './subscription-min-aggregate.input'
import { SubscriptionMaxAggregateInput } from './subscription-max-aggregate.input'

@ArgsType()
export class SubscriptionAggregateArgs {
  @Field(() => SubscriptionWhereInput, { nullable: true })
  @Type(() => SubscriptionWhereInput)
  where?: SubscriptionWhereInput

  @Field(() => [SubscriptionOrderByWithRelationInput], { nullable: true })
  orderBy?: Array<SubscriptionOrderByWithRelationInput>

  @Field(() => SubscriptionWhereUniqueInput, { nullable: true })
  cursor?: SubscriptionWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => SubscriptionCountAggregateInput, { nullable: true })
  _count?: SubscriptionCountAggregateInput

  @Field(() => SubscriptionMinAggregateInput, { nullable: true })
  _min?: SubscriptionMinAggregateInput

  @Field(() => SubscriptionMaxAggregateInput, { nullable: true })
  _max?: SubscriptionMaxAggregateInput
}
