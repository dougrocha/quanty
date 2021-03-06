#!/usr/bin/env node

import { Command } from 'commander'

import { CommandLoader } from '../src/commands/index'

const bootstrap = async () => {
  const program = new Command()

  program
    .version('1.0.0', '-v, --version', 'Output the current version.')
    .usage('<command> [options]')
    .helpOption('-h, --help', 'Output helpful information')
    .description('Quanty Cli to make developing discord bots easier.')

  await CommandLoader.load(program)

  await program.parseAsync(process.argv)

  if (!process.argv.slice(2).length) {
    program.outputHelp()
  }
}

void bootstrap()
