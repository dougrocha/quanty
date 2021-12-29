import { promisify } from 'util'

import { Command } from '@quanty/framework'
import { BaseCommand } from '@quanty/framework/dist/src/types'
import { glob } from 'glob'

const globPromise = promisify(glob)

interface CommandImport {
  command: Partial<BaseCommand>
}

export const command: Command = {
  name: 'load',
  description: 'Get or edit the prefix for commands.',
  options: [
    {
      type: 'SUB_COMMAND',
      name: 'get',
      description: 'Get prefix for guild.',
      options: [],
    },
    {
      type: 'SUB_COMMAND',
      name: 'edit',
      description: 'Changes prefix',
      options: [
        {
          type: 'STRING',
          name: 'prefix',
          description: 'Sets a new prefix.',
          required: true,
        },
      ],
    },
  ],
  category: 'util',
  isOwnerOnly: true,
  run: async ({ client, guild }) => {
    const slashCommandFiles: string[] = await globPromise(
      `${__dirname}/../../slashCmds/**/*{.ts,.js}`,
    )

    await client.guilds.cache.get(guild.id)?.commands.set([])

    slashCommandFiles.map(async (value: string) => {
      const { command } = (await require(value)) as CommandImport

      if (!command.type) {
        return console.log(`${command.name} does not have a type. FIX IT`)
      }

      if (['MESSAGE', 'USER'].includes(command.type)) delete command.description

      await client.guilds.cache.get(guild.id)?.commands.create(command as any)
    })

    return { content: 'Slash Commands Loaded slash' }
  },
}
