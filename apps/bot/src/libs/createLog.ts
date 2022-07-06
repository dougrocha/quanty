export const enum CreateLogActionsEnum {
  BANUSER = 'Banned user',
  UNBANUSER = 'Unbanned user',
  CHANGEPREFIX = 'Changed prefix',
}

interface ICreateLog {
  guildId: string
  user: unknown
  action: CreateLogActionsEnum
}

export const createLog = async ({ guildId, action, user }: ICreateLog) => {
  throw new Error('Create Log is not implemented')
}
