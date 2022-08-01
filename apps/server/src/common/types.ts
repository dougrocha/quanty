import { User } from '../@generated'

export type Done = (err: Error | null, user: User | null) => void
