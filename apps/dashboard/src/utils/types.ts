export interface CurrentUser {
  username: string
  discordId: string
  discriminator: string
  email?: string | null
  avatar?: string | null
  verified?: boolean | null
  locale?: string | null
}
