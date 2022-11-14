import type { CommandInteraction } from 'discord.js'

import type { QuantyClient } from '../../structures/client/Client'
import type { IVerifyReturnObj } from '../../structures/command/types/Command'

// export function Verify(
//   fn: (
//     i: CommandInteraction,
//     client?: QuantyClient,
//   ) => IVerifyReturnObj | Promise<IVerifyReturnObj>,
//   custom?: boolean,
// ) {
//   if (custom) return setMetaData('customVerify', fn)
//   return setMetaData('extendedVerify', fn)
// }
