import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'

@ObjectType()
export class ProductMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  name?: string

  @Field(() => String, { nullable: true })
  description?: string
}
