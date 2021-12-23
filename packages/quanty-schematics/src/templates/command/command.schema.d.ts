import { Path } from '@angular-devkit/core'

export interface CommandOptions {
  name: string
  description?: string
  category: string
  path?: string | Path
  flat?: boolean
  type?: string
}
