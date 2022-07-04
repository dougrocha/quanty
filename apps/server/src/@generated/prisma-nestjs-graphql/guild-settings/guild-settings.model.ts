import { Field } from '@nestjs/graphql'
import { ObjectType } from '@nestjs/graphql'
import { ID } from '@nestjs/graphql'
import { Int } from '@nestjs/graphql'
import { Guild } from '../guild/guild.model'

@ObjectType()
export class GuildSettings {
  @Field(() => ID, { nullable: false })
  id!: string

  @Field(() => String, { nullable: false })
  defaultJoinRole!: string

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  nsfw!: boolean

  @Field(() => Int, { nullable: false, defaultValue: 0 })
  globalCooldown!: number

  @Field(() => String, { nullable: false })
  djRole!: string

  @Field(() => Boolean, { nullable: false, defaultValue: false })
  musicTimeOut!: boolean

  @Field(() => Guild, { nullable: true })
  guild?: Guild | null
}
