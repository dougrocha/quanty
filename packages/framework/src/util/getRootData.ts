import { readFileSync } from 'fs'
import { join } from 'path'

let rootData: RootData | null = null

export const getRootData = () => {
  if (rootData) return rootData

  const cwd = process.cwd()

  try {
    const file = JSON.parse(readFileSync(`${cwd}/package.json`, 'utf8'))
    rootData = { root: join(cwd, file.main) }
  } catch (error) {
    rootData = { root: cwd }
  }

  return rootData
}

export interface RootData {
  root: string
}

let tsConfig: TsConfig | null = null

export interface GetTsConfigOptions {
  tsConfigPath?: string
}

export const getTsConfig = ({ tsConfigPath }: GetTsConfigOptions) => {
  if (tsConfig) return tsConfig

  const cwd = process.cwd()

  try {
    const file = JSON.parse(
      readFileSync(`${cwd}/${tsConfigPath ?? 'tsconfig.json'}`, 'utf8'),
    )

    tsConfig = file
  } catch (error) {
    tsConfig = null
  }

  return tsConfig as TsConfig
}

export interface TsConfig {
  compilerOptions?: {
    rootDir?: string
    baseUrl?: string
    outDir?: string
  }
}
