import { join, Path, strings } from '@angular-devkit/core';
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
} from '@angular-devkit/schematics';
import { validateRoot } from '../../utils';
import { CommandOptions } from './command.schema';

export function main(_options: CommandOptions): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _options = transform(_options);

    const workspaceBuffer = validateRoot(tree);
    if (!workspaceBuffer) {
      throw new SchematicsException('This is not a typescript workspace');
    }

    return mergeWith(generate(_options));
  };
}

function transform(_options: CommandOptions): CommandOptions {
  const options = _options;

  if (!options.name) {
    throw new SchematicsException('Option (name) is required');
  }

  options.name = strings.dasherize(options.name);

  options.path = options.path
    ? options.path
    : join(options.path as Path, options.category);

  return options;
}

function generate(_options: CommandOptions): Source {
  return (context: SchematicContext) =>
    apply(url('./files' as Path), [
      template({
        ..._options,
        ...strings,
      }),
      move(_options.path!),
    ])(context);
}
