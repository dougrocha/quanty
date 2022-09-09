import { Users } from '../@generated'

export type Done = (err: Error | null, user: Users | null) => void
