import * as path from 'path'

import { HostTree } from '@angular-devkit/schematics'
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing'

import { ICommandOptions } from './command.schema'

describe('Command factory', () => {
  const runner: SchematicTestRunner = new SchematicTestRunner(
    '.',
    path.join(process.cwd(), 'src/collection.json'),
  )

  describe('with root files', () => {
    let commandTree: UnitTestTree
    beforeEach(async () => {
      commandTree = await runner
        .runExternalSchematicAsync('@schematics/angular', 'workspace', {
          name: 'workspace',
          newProjectRoot: 'projects',
          version: '0.5.0',
        })
        .toPromise()
    })

    it('makes with name and category', async () => {
      const commandOptions: ICommandOptions = {
        name: 'fiz',
        category: 'bar',
      }
      commandTree = await runner
        .runExternalSchematicAsync('.', 'command', commandOptions, commandTree)
        .toPromise()

      const files: string[] = commandTree.files

      expect(files.find(filename => filename === '/bar/fiz.ts')).toBeDefined()
      expect(commandTree.readContent('/bar/fiz.ts')).toContain('name: `fiz`')
      expect(commandTree.readContent('/bar/fiz.ts')).toContain(
        "category: 'bar'",
      )
    })

    it('makes file with name', async () => {
      const commandOptions: ICommandOptions = {
        name: 'fiz',
      }
      commandTree = await runner
        .runExternalSchematicAsync('.', 'command', commandOptions, commandTree)
        .toPromise()

      const files: string[] = commandTree.files

      expect(files.find(filename => filename === '/fiz.ts')).toBeDefined()
      expect(commandTree.readContent('/fiz.ts')).toContain('name: `fiz`')
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
