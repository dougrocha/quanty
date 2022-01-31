import { promisify } from 'util'

import QuantyClient, { Command } from '@quanty/framework'
import glob from 'glob'

const globPromise = promisify(glob)

export const turnOnPlugin = async (
  path: string,
  client: QuantyClient,
  id: string,
) => {
  const files: string[] = await globPromise(`${path}/**/*[!.d]{.ts,.js}`)

  files.map(async filename => {
    const { command }: { command: Command } = await import(filename)
    const guild = client.guilds.cache.get(id)

    await guild?.commands.create({
      name: command.name,
      description: command.description,
      options: command.options,
    })
  })
}

export const turnOffPlugin = async (
  path: string,
  client: QuantyClient,
  id: string,
) => {
  const files: string[] = await globPromise(`${path}/**/*[!.d]{.ts,.js}`)

  files.map(async filename => {
    const { command }: { command: Command } = await import(filename)

    const guild = client.guilds.cache.get(id)

    await (await guild?.commands.fetch())
      ?.find(c => c.name === command.name)
      ?.delete()
  })
}
