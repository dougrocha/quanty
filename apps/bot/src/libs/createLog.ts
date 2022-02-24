import { GuildModel, GuildLogsModel } from '../database/schemas'
import { BaseUser } from '../database/schemas/extras'

export const enum CreateLogActionsEnum {
  BANUSER = 'Banned user',
  UNBANUSER = 'Unbanned user',
  CHANGEPREFIX = 'Changed prefix',
}

interface ICreateLog {
  guildId: string
  user: BaseUser
  action: CreateLogActionsEnum
}

export const createLog = async ({ guildId, action, user }: ICreateLog) => {
  let guildConfig = await GuildModel.findOne({ guildId })

  if (!guildConfig) guildConfig = await GuildModel.create({ guildId })

  const guildLog = await GuildLogsModel.create({
    guildId: guildId,
    user,
    action,
  })

  if (guildConfig.logs?.length ?? 0 > 200) guildConfig.logs?.pop()

  guildConfig.logs?.push(guildLog)

  await guildConfig.save()
}
