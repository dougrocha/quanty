import { Field } from '@nestjs/graphql'
import { ArgsType } from '@nestjs/graphql'
import { ProductWhereInput } from './product-where.input'
import { Type } from 'class-transformer'
import { ProductOrderByWithAggregationInput } from './product-order-by-with-aggregation.input'
import { ProductScalarFieldEnum } from './product-scalar-field.enum'
import { ProductScalarWhereWithAggregatesInput } from './product-scalar-where-with-aggregates.input'
import { Int } from '@nestjs/graphql'
import { ProductCountAggregateInput } from './product-count-aggregate.input'
import { ProductMinAggregateInput } from './product-min-aggregate.input'
import { ProductMaxAggregateInput } from './product-max-aggregate.input'

@ArgsType()
export class ProductGroupByArgs {
  @Field(() => ProductWhereInput, { nullable: true })
  @Type(() => ProductWhereInput)
  where?: ProductWhereInput

  @Field(() => [ProductOrderByWithAggregationInput], { nullable: true })
  orderBy?: Array<ProductOrderByWithAggregationInput>

  @Field(() => [ProductScalarFieldEnum], { nullable: false })
  by!: Array<keyof typeof ProductScalarFieldEnum>

  @Field(() => ProductScalarWhereWithAggregatesInput, { nullable: true })
  having?: ProductScalarWhereWithAggregatesInput

  @Field(() => Int, { nullable: true })
  take?: number

  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => ProductCountAggregateInput, { nullable: true })
  _count?: ProductCountAggregateInput

  @Field(() => ProductMinAggregateInput, { nullable: true })
  _min?: ProductMinAggregateInput

  @Field(() => ProductMaxAggregateInput, { nullable: true })
  _max?: ProductMaxAggregateInput
}
