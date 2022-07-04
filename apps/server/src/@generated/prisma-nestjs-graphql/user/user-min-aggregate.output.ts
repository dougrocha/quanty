import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { HideField } from '@nestjs/graphql'

@ObjectType()
export class UserMinAggregate {
  @Field(() => String, { nullable: true })
  id?: string

  @Field(() => String, { nullable: true })
  username?: string

  @Field(() => String, { nullable: true })
  discriminator?: string

  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => String, { nullable: true })
  avatar?: string

  @Field(() => Date, { nullable: true })
  createdAt?: Date | string

  @Field(() => String, { nullable: true })
  locale?: string

  @HideField()
  accessToken?: string

  @HideField()
  refreshToken?: string

  @Field(() => Boolean, { nullable: true })
  acceptedTermsAndConditions?: boolean
}
