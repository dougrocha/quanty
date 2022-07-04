import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { HideField } from '@nestjs/graphql'
import { UserCountAggregate } from './user-count-aggregate.output'
import { UserMinAggregate } from './user-min-aggregate.output'
import { UserMaxAggregate } from './user-max-aggregate.output'

@ObjectType()
export class UserGroupBy {
  @Field(() => String, { nullable: false })
  id!: string

  @Field(() => String, { nullable: false })
  username!: string

  @Field(() => String, { nullable: false })
  discriminator!: string

  @Field(() => String, { nullable: true })
  email?: string

  @Field(() => String, { nullable: true })
  avatar?: string

  @Field(() => Date, { nullable: false })
  createdAt!: Date | string

  @Field(() => String, { nullable: true })
  locale?: string

  @HideField()
  accessToken?: string

  @HideField()
  refreshToken?: string

  @Field(() => Boolean, { nullable: false })
  acceptedTermsAndConditions!: boolean

  @Field(() => UserCountAggregate, { nullable: true })
  _count?: UserCountAggregate

  @Field(() => UserMinAggregate, { nullable: true })
  _min?: UserMinAggregate

  @Field(() => UserMaxAggregate, { nullable: true })
  _max?: UserMaxAggregate
}
