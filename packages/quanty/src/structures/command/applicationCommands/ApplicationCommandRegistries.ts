import {
  ApplicationCommandDataResolvable,
  Collection,
  REST,
  Routes,
} from 'discord.js'
import type { Logger } from '../../../util'
import { container } from '../../container'
import type { Command } from '../Command'
import { ApplicationCommandRegistry } from './ApplicationCommandRegistry'

let rest: REST

export const registries = new Collection<string, ApplicationCommandRegistry>()

export const guildIdsToFetchCommandsFor = new Set<string>()

export const getRestClient = () => {
  if (!rest) {
    rest = new REST({ version: '9' }).setToken(
      container.client?.token ?? process.env.BOT_TOKEN,
    )
  }

  return rest
}

export const acquire = (commandName: string) => {
  const existing = registries.get(commandName)
  if (existing) return existing

  const newRegistry = new ApplicationCommandRegistry(commandName)
  registries.set(commandName, newRegistry)

  return newRegistry
}

export const loadGuildCommands = async (
  guildId: string,
  commands: ApplicationCommandDataResolvable,
) => {
  const clientId = container.client?.application?.id
  if (!clientId) return

  await getRestClient()
    ?.put(Routes.applicationGuildCommands(clientId, guildId), {
      body: commands,
    })
    .then(() => {
      console.log('Successfully registered application commands.')
    })
    .catch(error => {
      console.error(error)
    })
}

const buildCommand = (command: Command): ApplicationCommandDataResolvable => {
  return {
    name: command.name,
    description: command.description ?? '',
    // These have the same form somehow typescript still complains
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    options: command.slashOptions as any,
    type: command.type,
  }
}

export const registerTestCommands = async (logger?: Logger) => {
  const client = container.client
  const commandStore = container.stores?.get('commands')

  if (!client || !commandStore) return
  const testGuilds = client.devGuilds

  const testCommands = commandStore.filter(cmd => cmd.isTestCommand() === true)

  for (const testGuild of testGuilds) {
    const guild = await client.guilds.fetch(testGuild).catch(() => undefined)
    if (!guild) {
      logger?.warn(`Guild ${testGuild} not found.`)
      continue
    }
    const registeredGuildCommands = await guild.commands.fetch()

    registeredGuildCommands.map(async registeredCommand => {
      const testCmd = testCommands.find(
        testCmd =>
          testCmd.name === registeredCommand.name ||
          testCmd.description === registeredCommand.description,
      )

      if (!testCmd) {
        logger?.warn(
          `Command ${registeredCommand.name} not found. Command will now be deleted from guild ${guild.name}.`,
        )

        return await registeredCommand.delete()
      }

      const builtTestCmd = buildCommand(testCmd)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isIdentical = registeredCommand.equals(builtTestCmd as any)

      if (!isIdentical) {
        logger?.warn(
          `Editing test command ${testCmd.name} for guild ${guild.name}.`,
        )

        return guild.commands.edit(registeredCommand, builtTestCmd)
      }
    })

    testCommands.map(async testCmd => {
      if (
        registeredGuildCommands.find(
          registeredCmd =>
            registeredCmd.name === testCmd.name ||
            registeredCmd.description === testCmd.description,
        )
      )
        return

      const builtCommand = buildCommand(testCmd)

      await guild.commands.create(builtCommand)

      logger?.debug(
        `Creating new test command: ${testCmd.name} for guild ${guild.name}.`,
      )
    })
  }
}
