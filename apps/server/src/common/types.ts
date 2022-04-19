import { User } from 'src/schemas'

export interface UserDetails {
  username: string
  discriminator: string
  discordId: string
  email?: string
  verified: boolean
  locale: string
  accessToken: string
  refreshToken: string
}

export type Done = (err: Error | null, user: User | null) => void
