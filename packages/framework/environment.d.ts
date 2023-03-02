import { ClientOptionsSchema } from './src/util/options'

declare namespace NodeJS {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface ProcessEnv extends ClientOptionsSchema {}
}
