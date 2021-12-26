import { HostTree } from '@angular-devkit/schematics'
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing'
import * as path from 'path'

import { ICommandOptions } from './command.schema'

describe('Command factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  )

  describe('with root files', () => {
    const commandOptions: ICommandOptions = {
      name: 'fiz',
      category: 'bar',
    }

    let commandTree: UnitTestTree
    beforeEach(async () => {
      commandTree = await runner
        .runExternalSchematicAsync('@schematics/angular', 'workspace', {
          name: 'workspace',
          newProjectRoot: 'projects',
          version: '0.5.0',
        })
        .toPromise()
      commandTree = await runner
        .runExternalSchematicAsync('.', 'command', commandOptions, commandTree)
        .toPromise()
    })

    it('works with name and category', async () => {
      const files: string[] = commandTree.files

      expect(
        files.find(filename => filename === '/bar/fiz.ts'),
      ).not.toBeUndefined()
      expect(commandTree.readContent('/bar/fiz.ts')).toContain('name: `fiz`')
      expect(commandTree.readContent('/bar/fiz.ts')).toContain(
        "category: 'bar'",
      )
    })
  })

  describe('without root files', () => {
    let tree: UnitTestTree

    beforeEach(() => {
      tree = new UnitTestTree(new HostTree())
    })

    it('fails', () => {
      expect(tree.files).toBeUndefined
    })
    it('fails without package.json', () => {
      tree.create('tsconfig.json', `{extends: "tsconfig/foo.json"}`)
      expect(
        tree.files.find(filename => filename === '/tsconfig.json'),
      ).not.toBeUndefined()
      expect(
        tree.files.find(filename => filename === '/package.json'),
      ).toBeUndefined()
    })
    it('fails without tsconfig.json', () => {
      tree.create('package.json', `{name: "foo", version: "1.0.0"}`)
      expect(
        tree.files.find(filename => filename === '/tsconfig.json'),
      ).toBeUndefined()
      expect(
        tree.files.find(filename => filename === '/package.json'),
      ).not.toBeUndefined()
    })
  })
})
