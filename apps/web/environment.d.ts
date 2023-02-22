import { z } from 'zod'
import type { clientSchema } from './src/env/schema.mjs'

type Env = z.infer<typeof clientSchema>

declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    export interface ProcessEnv extends Env {}
  }
}
