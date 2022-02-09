// Current User Type
export type CurrentUser = {
  username: string
  discordID: string
  discriminator: string
  avatar: string
}

// Guild Types
export type ownerGuild = {
  id: string
  name: string
  icon: string
  owner: boolean
}

export type Guild = {
  id: string
  name: string
  icon: string
  owner_id: string
  description: string
  preferred_locale: string
  features: string[]
  emojis: Emoji[]
  stickers: Sticker[]
  roles: Role[]
  afk_timeout: number
  channels: Channel[]
}

type Channel = {
  id: string
  parent_id: string
  name: string
  type: number
  guild_id: string
  topic: string
  position: number
  nsfw: boolean
}

type Emoji = {
  name: string
  roles: Role[]
  id: string
  require_colons: boolean
  managed: boolean
  animated: boolean
  available: boolean
}

type Role = {
  id: string
  name: string
  permissions: string
  position: number
  color: number
  mentionable: boolean
}

type Sticker = {
  id: string
  name: string
  tag: string
  description: string
  guild_id: string
}
