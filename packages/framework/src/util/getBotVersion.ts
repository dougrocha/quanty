import { readFileSync } from 'fs'

export const getVersion = () => {
  const cwd = process.cwd()
  const file = JSON.parse(readFileSync(`${cwd}/package.json`, 'utf8'))
  return file.version
}

export const getProjectName = () => {
  const cwd = process.cwd()
  const file = JSON.parse(readFileSync(`${cwd}/package.json`, 'utf8'))
  return file.name
}

