import { User } from 'src/schemas'

export interface UserDetails {
  username: string
  discriminator: string
  discordId: string
  email: string | undefined
  avatar: string | null
  accessToken: string
  refreshToken: string
}

export type Done = (err: Error | null, user: User | null) => void
