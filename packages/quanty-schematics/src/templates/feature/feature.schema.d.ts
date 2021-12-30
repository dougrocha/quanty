import { Path } from '@angular-devkit/core'

export interface IFeatureOptions {
  name: string
  once?: 'true' | 'false' | boolean
  args?: string
  path?: string | Path
  flat?: boolean
}
