import { Path } from '@angular-devkit/core'

export interface ICommandOptions {
  name: string
  description?: string
  category?: string
  path?: string | Path
  flat?: boolean
  cmdType?: CmdTypes
}

type CmdTypes = 'message' | 'both' | 'slash'
