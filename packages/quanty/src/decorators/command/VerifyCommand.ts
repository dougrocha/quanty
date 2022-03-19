import { CommandInteraction } from 'discord.js'

import { QuantyClient } from '../../structures/client/Client'
import { IVerifyReturnObj } from '../../structures/command/types/Command'
import { setMetaData } from '../utils'

export function Verify(
  fn: (
    i: CommandInteraction,
    client?: QuantyClient,
  ) => IVerifyReturnObj | Promise<IVerifyReturnObj>,
  custom?: boolean,
) {
  if (custom) return setMetaData('customVerify', fn)
  return setMetaData('extendedVerify', fn)
}
