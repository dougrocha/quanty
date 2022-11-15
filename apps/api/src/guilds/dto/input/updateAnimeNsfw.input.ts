import { Field, InputType } from '@nestjs/graphql'
import { IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateAnimeNsfw {
  @Field()
  @IsNotEmpty()
  guildId: string

  @Field()
  @IsNotEmpty()
  nsfw: boolean
}
