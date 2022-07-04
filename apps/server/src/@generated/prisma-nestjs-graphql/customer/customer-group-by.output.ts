import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { CustomerCountAggregate } from './customer-count-aggregate.output'
import { CustomerMinAggregate } from './customer-min-aggregate.output'
import { CustomerMaxAggregate } from './customer-max-aggregate.output'

@ObjectType()
export class CustomerGroupBy {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => Boolean, { nullable: false })
  subscriptionId!: boolean

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string

  @Field(() => String, { nullable: true })
  userId?: string

  @Field(() => CustomerCountAggregate, { nullable: true })
  _count?: CustomerCountAggregate

  @Field(() => CustomerMinAggregate, { nullable: true })
  _min?: CustomerMinAggregate

  @Field(() => CustomerMaxAggregate, { nullable: true })
  _max?: CustomerMaxAggregate
}
