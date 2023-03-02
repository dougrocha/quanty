import { z } from 'zod'

import { clientEnvSchema } from './src/utils/env'

declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ProcessEnv extends z.infer<typeof clientEnvSchema> {}
}
