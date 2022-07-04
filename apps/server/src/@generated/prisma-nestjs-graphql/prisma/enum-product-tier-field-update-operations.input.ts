import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'
import { Product_tier } from './product-tier.enum'

@InputType()
export class EnumProduct_tierFieldUpdateOperationsInput {
  @Field(() => Product_tier, { nullable: true })
  set?: keyof typeof Product_tier
}
