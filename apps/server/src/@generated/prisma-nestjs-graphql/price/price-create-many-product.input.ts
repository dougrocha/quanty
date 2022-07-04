import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { PriceType } from '../prisma/price-type.enum'

@InputType()
export class PriceCreateManyProductInput {
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
}
