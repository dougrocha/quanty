import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { CustomerWhereInput } from './customer-where.input'
import { Type } from 'class-transformer'
import { CustomerOrderByWithRelationAndSearchRelevanceInput } from './customer-order-by-with-relation-and-search-relevance.input'
import { CustomerWhereUniqueInput } from './customer-where-unique.input'
import { Int } from '@nestjs/graphql'
import { CustomerCountAggregateInput } from './customer-count-aggregate.input'
import { CustomerMinAggregateInput } from './customer-min-aggregate.input'
import { CustomerMaxAggregateInput } from './customer-max-aggregate.input'

@ArgsType()
export class CustomerAggregateArgs {
  @Field(() => CustomerWhereInput, { nullable: true })
  @Type(() => CustomerWhereInput)
  where?: CustomerWhereInput

  @Field(() => [CustomerOrderByWithRelationAndSearchRelevanceInput], {
    nullable: true,
  })
  orderBy?: Array<CustomerOrderByWithRelationAndSearchRelevanceInput>

  @Field(() => CustomerWhereUniqueInput, { nullable: true })
  cursor?: CustomerWhereUniqueInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => CustomerCountAggregateInput, { nullable: true })
  _count?: CustomerCountAggregateInput

  @Field(() => CustomerMinAggregateInput, { nullable: true })
  _min?: CustomerMinAggregateInput

  @Field(() => CustomerMaxAggregateInput, { nullable: true })
  _max?: CustomerMaxAggregateInput
}
