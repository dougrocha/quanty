import { ICommand } from '@quanty/framework'

import { glob } from 'glob'
import { promisify } from 'util'
const globPromise = promisify(glob)

export const command: ICommand = {
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
  ownerOnly: true,
  run: async ({ client, guild }) => {
    const slashCommandFiles: string[] = await globPromise(
      `${__dirname}/../../slashCmds/**/*{.ts,.js}`,
    )

    await client.guilds.cache.get(guild.id)?.commands.set([])

    slashCommandFiles.map(async (value: string) => {
      const { command } = await require(value)

      if (['MESSAGE', 'USER'].includes(command.type)) delete command.description

      await client.guilds.cache.get(guild.id)?.commands.create(command)
    })

    return { content: 'Slash Commands Loaded slash' }
  },
}
