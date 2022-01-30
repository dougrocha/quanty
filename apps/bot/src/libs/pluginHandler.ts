import fs from 'fs'

import QuantyClient, { Command } from '@quanty/framework'

export const turnOnPlugin = (
  path: string,
  client: QuantyClient,
  id: string,
) => {
  fs.readdirSync(path).map(async filename => {
    const { command }: { command: Command } = await import(
      `${path}/${filename}`
    )
    const guild = client.guilds.cache.get(id)

    await guild?.commands.create({
      name: command.name,
      description: command.description,
    })
  })
}

export const turnOffPlugin = (
  path: string,
  client: QuantyClient,
  id: string,
) => {
  fs.readdirSync(path).map(async filename => {
    const { command }: { command: Command } = await import(
      `${path}/${filename}`
    )

    const guild = client.guilds.cache.get(id)
    await guild?.commands.delete(command.name)
  })
}
