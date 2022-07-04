import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class ProductUncheckedCreateWithoutPriceInput {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: false })
  name!: string

  @Field(() => String, { nullable: true })
  description?: string
}
