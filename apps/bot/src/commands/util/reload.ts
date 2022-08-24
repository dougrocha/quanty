import { promisify } from 'util'

import {
  CommandReturnType,
  Category,
  Command,
  OwnerOnly,
  SlashCommand,
  CommandOptions,
} from '@quanty/framework'
import { ApplicationCommandOptionType } from 'discord.js'
import { glob } from 'glob'

const globPromise = promisify(glob)

interface CommandImport {
  command: Partial<Command>
}

@Category('util')
@SlashCommand('load', {
  description: 'Get or edit the prefix for commands.',
  options: [
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'get',
      description: 'Get prefix for guild.',
      options: [],
    },
    {
      type: ApplicationCommandOptionType.Subcommand,
      name: 'edit',
      description: 'Changes prefix',
      options: [
        {
          type: ApplicationCommandOptionType.String,
          name: 'prefix',
          description: 'Sets a new prefix.',
          required: true,
        },
      ],
    },
  ],
})
@OwnerOnly()
export class LoadCommand extends Command {
  async run({ guild, client }: CommandOptions): CommandReturnType {
    const slashCommandFiles: string[] = await globPromise(
      `${__dirname}/../../slashCmds/**/*{.ts,.js}`,
    )

    await client.guilds.cache.get(guild.id)?.commands.set([])

    slashCommandFiles.map(async (value: string) => {
      const { command } = (await require(value)) as CommandImport

      if (!command.type) {
        return console.log(
          `${command.commandName} does not have a type. FIX IT`,
        )
      }

      if (['MESSAGE', 'USER'].includes(command.type)) delete command.description

      await client.guilds.cache.get(guild.id)?.commands.create(command as any)
    })

    return { content: 'Slash Commands Loaded slash' }
  }
  async error(): CommandReturnType {
    throw new Error('Method not implemented.')
  }
}
