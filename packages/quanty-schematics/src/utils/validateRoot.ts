import { Tree } from '@angular-devkit/schematics'

export const validateRoot = (host: Tree) => {
  const files = ['tsconfig.json', 'package.json']
  return files.map(file => host.exists(file)).some(isPresent => isPresent)
}
