import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { HideField } from '@nestjs/graphql'

@ObjectType()
export class UserCountAggregate {
  @Field(() => Int, { nullable: false })
  id!: number

  @Field(() => Int, { nullable: false })
  username!: number

  @Field(() => Int, { nullable: false })
  discriminator!: number

  @Field(() => Int, { nullable: false })
  email!: number

  @Field(() => Int, { nullable: false })
  avatar!: number

  @Field(() => Int, { nullable: false })
  createdAt!: number

  @Field(() => Int, { nullable: false })
  locale!: number

  @HideField()
  accessToken!: number

  @HideField()
  refreshToken!: number

  @Field(() => Int, { nullable: false })
  acceptedTermsAndConditions!: number

  @Field(() => Int, { nullable: false })
  _all!: number
}
