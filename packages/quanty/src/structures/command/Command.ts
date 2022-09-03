import {
  ApplicationCommandOptionData,
  CommandInteraction,
  Awaitable,
  ContextMenuCommandInteraction,
} from 'discord.js'
import { GUARDS_METADATA } from '../../constants'
import { isEmpty } from '../../util'

import { Logger } from '../../util/Logger'
import { NonNullObject } from '../../util/types'
import { Part } from '../part/Part'

interface CanActivate {
  canActivate(context: unknown): boolean | Promise<boolean>
}

class GuardsConsumer {
  public async tryActivate<TContext extends string = any>(
    guards: CanActivate[],
  ): Promise<boolean> {
    if (!guards || isEmpty(guards)) {
      return true
    }

<<<<<<< Updated upstream
<<<<<<< Updated upstream
  public _init(client: C): this {
    this.client = client
    if (!this.commandName)
      this._logger.error('Cannot register a command without a name.')

    return this
  }

  public getUserCooldown(userId: Snowflake): CooldownObject | null {
    if (this.client.owner?.includes(userId) || !this.cooldown) return null

    let cooldown = this.userCooldowns.get(userId)
    if (!cooldown) {
      cooldown = {
        start: Date.now(),
        uses: 0,
        timeout: this.client.setTimeout(() => {
          this.userCooldowns.delete(userId)
        }, this.cooldown.timeout * 1000),
=======
=======
>>>>>>> Stashed changes
    for (const guard of guards) {
      const test = new guard()
      test.canActivate({ test: 'test' })
      console.log('bf', new guard())
      const result = guard.canActivate({ testing: 'test' })
      console.log('resuslt', result)
      if (await result) {
        continue
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
      }
      return false
    }

    console.log({ guards })

    return true
  }
}

export class Command<O extends Command.Options = Command.Options> extends Part {
  public description?: string

  public detailedDescription?: DetailedDescription

  public guards: CanActivate[] = []

  public readonly category?: readonly string[]

  public typing?: boolean

  private readonly slashOptions?: ApplicationCommandOptionData

  protected logger?: Logger

  private guardsConsumer?: GuardsConsumer

  public constructor(context: Part.Context, options: O = {} as O) {
    super(context, options)

    if (!this.category) this.category = this.location.directories

    this.logger = new Logger(`COMMAND:${this.name}`)

    this.guardsConsumer = new GuardsConsumer()
  }

  public before() {
    this.guards = Reflect.getMetadata(GUARDS_METADATA, this.run as () => void)
    this.guardsConsumer?.tryActivate(this.guards)
  }

  public run?(interaction: CommandInteraction): Awaitable<void>

  public contextRun?(
    interaction: ContextMenuCommandInteraction,
  ): Awaitable<void>
}

export namespace Command {
  export type Options = CommandOptions
  export type Context = Part.Context
}

export interface CommandOptions extends Part.Options {
  description?: string

  detailedDescription?: DetailedDescription

  slashOptions?: ApplicationCommandOptionData[]
}

export type DetailedDescription = string | DetailedDescriptionObject

export type DetailedDescriptionObject = NonNullObject

// export abstract class Command<C extends QuantyClient = QuantyClient>
//   implements ICommandOptions
// {
//   public client!: C

//   public _className!: string

//   @logger()
//   private _logger!: Logger

//   public commandName!: string

//   public description!: string

//   public category!: string

//   public aliases!: string | string[]

//   public options!: ApplicationCommandOptionData[]

//   public guildOnly!: boolean

//   public ownerOnly!: boolean

//   public nsfwOnly!: boolean

//   public type!: CommandTypes

//   public userPermissions!: PermissionsString[]

//   public clientPermissions!: PermissionsString[]

//   public extendedVerify!: (
//     interaction: CommandInteraction,
//     client: C,
//   ) => IVerifyReturnObj

//   public customVerify!: (
//     interaction: CommandInteraction,
//     client: C,
//   ) => IVerifyReturnObj

//   public test!: boolean

//   public cooldown!: ICooldownOptions

//   public userCooldowns: Collection<Snowflake, CooldownObject> = new Collection()

//   public guildCooldown!: number

//   public guildCooldowns: Collection<Snowflake, number> = new Collection()

//   protected constructor(commandOptions?: ICommandOptions) {
//     if (commandOptions) {
//       if (commandOptions.commandName)
//         this.commandName = commandOptions.commandName
//       if (commandOptions.description)
//         this.description = commandOptions.description
//       if (commandOptions.category) this.category = commandOptions.category
//       if (commandOptions.ownerOnly) this.ownerOnly = commandOptions.ownerOnly
//       if (commandOptions.guildOnly) this.guildOnly = commandOptions.guildOnly
//       if (commandOptions.aliases) this.aliases = commandOptions.aliases
//       if (commandOptions.cooldown) this.cooldown = commandOptions.cooldown
//       if (commandOptions.guildCooldown)
//         this.guildCooldown = commandOptions.guildCooldown
//       if (commandOptions.options) this.options = commandOptions.options
//       if (commandOptions.userPermissions)
//         this.userPermissions = commandOptions.userPermissions
//       if (commandOptions.clientPermissions)
//         this.clientPermissions = commandOptions.clientPermissions
//     }
//   }

//   public _init(client: C): this {
//     this.client = client
//     if (!this.commandName)
//       this._logger.error('Cannot register a command without a name.')

//     return this
//   }

//   public getUserCooldown(userId: Snowflake): CooldownObject | null {
//     if (this.client.owner?.includes(userId) || !this.cooldown) return null

//     let cooldown = this.userCooldowns.get(userId)
//     if (!cooldown) {
//       cooldown = {
//         start: Date.now(),
//         uses: 0,
//         timeout: this.client.setTimeout(() => {
//           this.userCooldowns.delete(userId)
//         }, this.cooldown.timeout * 1000),
//       }

//       this.userCooldowns.set(userId, cooldown)
//     }

//     return cooldown
//   }

//   abstract run(options?: CommandOptions): CommandReturnType

//   /**
//    * This will run if you throw any errors in the run method.
//    * @param e Error Obj
//    * @param options Command Options
//    */
//   abstract error?(e: any, options?: CommandOptions): CommandReturnType

//   private async verifyOptions(
//     interaction: CommandInteraction,
//     client: C,
//   ): Promise<IVerifyReturnObj> {
//     if (!client && !this.client)
//       throw new CommandVerificationError(
//         `Command: ${this.commandName} cannot verify without client.`,
//       )
//     if (this.cooldown && this.guildCooldown)
//       throw new CommandVerificationError(
//         `Command: ${this.commandName} has both user and guild cooldowns. Please choose one!`,
//       )

//     if (this.customVerify !== undefined) {
//       this.customVerify(interaction, client)
//       return { customVerify: true }
//     }

//     if (this.extendedVerify !== undefined) {
//       this.extendedVerify(interaction, client)
//     }

//     const { guild, channel, user } = interaction

//     if (this.ownerOnly && !this.client.checkOwner(user.id))
//       return { owner: true }

//     if (this.cooldown) {
//       const cooldown = this.getUserCooldown(user.id)

//       // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//       cooldown!.uses++

//       if (cooldown && cooldown.uses > this.cooldown.uses) {
//         const timeout =
//           (cooldown.start + this.cooldown.timeout * 1000 - Date.now()) / 1000
//         await interaction.reply(
//           `This command is on cooldown for ${timeout.toFixed(2)} seconds`,
//         )
//         return { cooldown: true }
//       }
//     }

//     if (
//       this.userPermissions &&
//       user.id != guild?.ownerId &&
//       interaction.memberPermissions?.has(this.userPermissions)
//     )
//       return { userPerms: true }

//     if (
//       this.client.user &&
//       channel &&
//       this.clientPermissions &&
//       guild?.members.cache
//         .get(this.client.user?.id)
//         ?.permissionsIn(channel?.id)
//         .missing(this.clientPermissions)
//     )
//       return { clientPerms: true }

//     if (guild && this.nsfwOnly && (channel as TextChannel).nsfw)
//       return { nsfw: true }
//     if (this.guildOnly && !guild) return { guild: true }
//     if (channel as DMChannel) return { dm: true }

//     return { channel: true }
//   }
// }
