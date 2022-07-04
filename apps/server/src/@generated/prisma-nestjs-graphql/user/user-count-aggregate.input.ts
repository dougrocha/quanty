import { Field } from '@nestjs/graphql'
import { InputType } from '@nestjs/graphql'

@InputType()
export class UserCountAggregateInput {
  @Field(() => Boolean, { nullable: true })
  id?: true

  @Field(() => Boolean, { nullable: true })
  username?: true

  @Field(() => Boolean, { nullable: true })
  discriminator?: true

  @Field(() => Boolean, { nullable: true })
  email?: true

  @Field(() => Boolean, { nullable: true })
  avatar?: true

  @Field(() => Boolean, { nullable: true })
  createdAt?: true

  @Field(() => Boolean, { nullable: true })
  locale?: true

  @Field(() => Boolean, { nullable: true })
  accessToken?: true

  @Field(() => Boolean, { nullable: true })
  refreshToken?: true

  @Field(() => Boolean, { nullable: true })
  acceptedTermsAndConditions?: true

  @Field(() => Boolean, { nullable: true })
  _all?: true
}
