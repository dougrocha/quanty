import type { CommandInteraction } from 'discord.js'

import type { QuantyClient } from '../../structures/client/Client'
import type { IVerifyReturnObj } from '../../structures/command/types/Command'
import { SetMetadata } from '../utils'

export function Verify(
  fn: (
    i: CommandInteraction,
    client?: QuantyClient,
  ) => IVerifyReturnObj | Promise<IVerifyReturnObj>,
  custom?: boolean,
) {
  if (custom) return SetMetadata('customVerify', fn)
  return SetMetadata('extendedVerify', fn)
}

