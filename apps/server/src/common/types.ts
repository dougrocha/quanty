import { User } from 'src/schemas'

export type UserDetails = {
  username: string
  discriminator: string
  discordID: string
  avatar: string | null
  accessToken: string
  refreshToken: string
}

export type Done = (err: Error | null, user: User | null) => void
