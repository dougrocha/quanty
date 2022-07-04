import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { CustomerWhereInput } from './customer-where.input'
import { Type } from 'class-transformer'
import { CustomerOrderByWithRelationAndSearchRelevanceInput } from './customer-order-by-with-relation-and-search-relevance.input'
import { CustomerWhereUniqueInput } from './customer-where-unique.input'
import { Int } from '@nestjs/graphql'
import { CustomerScalarFieldEnum } from './customer-scalar-field.enum'

@ArgsType()
export class FindFirstCustomerArgs {
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

  @Field(() => [CustomerScalarFieldEnum], { nullable: true })
  distinct?: Array<keyof typeof CustomerScalarFieldEnum>
}
