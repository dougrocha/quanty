import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { Price } from '../price/price.model'
import { ProductCount } from './product-count.output'

@ObjectType()
export class Product {
  @Field(() => ID, { nullable: false })
  id!: string

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description!: string | null

  @Field(() => [Price], { nullable: true })
  price?: Array<Price>

  @Field(() => ProductCount, { nullable: false })
  _count?: ProductCount
}
