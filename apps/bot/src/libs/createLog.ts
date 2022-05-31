import { LoggedUser } from '@quanty/schemas'

import { GuildsModel, GuildLogsModel } from '../database'

export const enum CreateLogActionsEnum {
  BANUSER = 'Banned user',
  UNBANUSER = 'Unbanned user',
  CHANGEPREFIX = 'Changed prefix',
}

interface ICreateLog {
  guildId: string
  user: LoggedUser
  action: CreateLogActionsEnum
}

export const createLog = async ({ guildId, action, user }: ICreateLog) => {
  let guildConfig = await GuildsModel.findOne({ guildId })

  if (!guildConfig) guildConfig = await GuildsModel.create({ guildId })

  const guildLog = await GuildLogsModel.create({
    guildId: guildId,
    user,
    action,
  })

  if (guildConfig.logs?.length ?? 0 > 200) guildConfig.logs?.pop()

  guildConfig.logs?.push(guildLog)

  await guildConfig.save()
}
