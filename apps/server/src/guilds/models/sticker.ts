import { Field, ObjectType } from '@nestjs/graphql'

import { DiscordUser } from './user'

@ObjectType()
export class Sticker {
  @Field()
  asset: ''

  @Field({ nullable: true })
  id: string

  @Field({ nullable: true })
  pack_id?: string

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  tags: string

  @Field()
  type: StickerType

  @Field()
  format_type: StickerFormatType

  @Field({ nullable: true })
  available?: boolean

  @Field({ nullable: true })
  guild_id?: string

  @Field(() => DiscordUser, { nullable: true })
  user?: DiscordUser

  @Field({ nullable: true })
  sort_value?: number
}

enum StickerFormatType {
  PNG = 1,
  APNG = 2,
  Lottie = 3,
}

enum StickerType {
  /**
   * An official sticker in a pack, part of Nitro or in a removed purchasable pack
   */
  Standard = 1,
  /**
   * A sticker uploaded to a Boosted guild for the guild's members
   */
  Guild = 2,
}
