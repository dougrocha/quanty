import * as path from 'path'

import { HostTree } from '@angular-devkit/schematics'
import {
  SchematicTestRunner,
  UnitTestTree,
} from '@angular-devkit/schematics/testing'

import { IFeatureOptions } from './feature.schema'

describe('Factory factory', () => {
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

    it('makes file with name', async () => {
      const featureOptions: IFeatureOptions = {
        name: 'fiz',
      }
      commandTree = await runner
        .runExternalSchematicAsync('.', 'feature', featureOptions, commandTree)
        .toPromise()

      const files: string[] = commandTree.files

      expect(files.find(filename => filename === '/fiz.ts')).toBeDefined()
      expect(commandTree.readContent('/fiz.ts')).toContain('name: `fiz`')
    })

    describe('makes file with the `once` variable', () => {
      it('when once is true', async () => {
        const featureOptions: IFeatureOptions = {
          name: 'fiz',
          once: 'true',
        }
        commandTree = await runner
          .runExternalSchematicAsync(
            '.',
            'feature',
            featureOptions,
            commandTree,
          )
          .toPromise()

        const files: string[] = commandTree.files

        expect(
          files.find(filename => filename === '/fiz.ts'),
        ).not.toBeUndefined()
        expect(commandTree.readContent('/fiz.ts')).toContain('name: `fiz`')
        expect(commandTree.readContent('/fiz.ts')).toContain('once: true')
      })
      it('when once is false', async () => {
        const featureOptions: IFeatureOptions = {
          name: 'fiz',
          once: 'false',
        }
        commandTree = await runner
          .runExternalSchematicAsync(
            '.',
            'feature',
            featureOptions,
            commandTree,
          )
          .toPromise()

        const files: string[] = commandTree.files

        expect(
          files.find(filename => filename === '/fiz.ts'),
        ).not.toBeUndefined()
        expect(commandTree.readContent('/fiz.ts')).toContain('name: `fiz`')
        expect(commandTree.readContent('/fiz.ts')).toContain('once: false')
      })
      it('when once is undefined', async () => {
        const featureOptions: IFeatureOptions = {
          name: 'fiz',
        }
        commandTree = await runner
          .runExternalSchematicAsync(
            '.',
            'feature',
            featureOptions,
            commandTree,
          )
          .toPromise()

        const files: string[] = commandTree.files

        expect(
          files.find(filename => filename === '/fiz.ts'),
        ).not.toBeUndefined()
        expect(commandTree.readContent('/fiz.ts')).toContain('name: `fiz`')
        expect(commandTree.readContent('/fiz.ts')).toContain('once: false')
      })
    })
    describe('makes files with run arguments', () => {
      it('works', async () => {
        const featureOptions: IFeatureOptions = {
          name: 'fiz',
          args: 'client, guild, ban',
        }
        commandTree = await runner
          .runExternalSchematicAsync(
            '.',
            'feature',
            featureOptions,
            commandTree,
          )
          .toPromise()

        const files: string[] = commandTree.files

        expect(
          files.find(filename => filename === '/fiz.ts'),
        ).not.toBeUndefined()
        expect(commandTree.readContent('/fiz.ts')).toContain('name: `fiz`')
        expect(commandTree.readContent('/fiz.ts')).toContain(
          '(client, guild, ban)',
        )
      })
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
      tree.create('tsconfig.json', `{extends: "@quanty/tsconfig/foo.json"}`)
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

