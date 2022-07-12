import { User } from '../@generated/prisma-nestjs-graphql'

export type Done = (err: Error | null, user: User | null) => void
