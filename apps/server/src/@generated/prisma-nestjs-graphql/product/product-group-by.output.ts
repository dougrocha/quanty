import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ProductCountAggregate } from './product-count-aggregate.output'
import { ProductMinAggregate } from './product-min-aggregate.output'
import { ProductMaxAggregate } from './product-max-aggregate.output'

@ObjectType()
export class ProductGroupBy {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string

  @Field(() => ProductCountAggregate, { nullable: true })
  _count?: ProductCountAggregate

  @Field(() => ProductMinAggregate, { nullable: true })
  _min?: ProductMinAggregate

  @Field(() => ProductMaxAggregate, { nullable: true })
  _max?: ProductMaxAggregate
}
