import { Path, strings } from '@angular-devkit/core'
import {
  apply,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  Source,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics'

import { IFeatureOptions } from './feature.schema'

import { validateRoot } from '../../utils'

export function main(_options: IFeatureOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const isWorkspace = validateRoot(tree)
    if (!isWorkspace) {
      throw new SchematicsException('This is not a typescript workspace')
    }

    _options = transform(_options)

    return mergeWith(generate(_options))
  }
}

function transform(_options: IFeatureOptions): IFeatureOptions {
  const options = _options

  if (!options.name) {
    throw new SchematicsException('Option (name) is required')
  }

  if (options.once == 'true') {
    options.once = true
  } else {
    options.once = false
  }

  options.args || (options.args = 'client')

  options.path = options.path as Path

  return options
}

function generate(_options: IFeatureOptions): Source {
  return (context: SchematicContext) =>
    apply(url('./files' as Path), [
      template({
        ..._options,
        ...strings,
      }),
      move(_options.path ?? '.'),
    ])(context)
}
