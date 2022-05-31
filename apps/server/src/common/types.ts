import { Users } from '@quanty/schemas'

export interface UserWithToken extends Omit<Users, 'avatar'> {
  avatar?: string | null
  accessToken: string
  refreshToken: string
}

export type Done = (err: Error | null, user: Users | null) => void
