import type {
  ApplicationCommandOptionData,
  CommandInteraction,
  Awaitable,
  ContextMenuCommandInteraction,
  InteractionReplyOptions,
  GuildMember,
  Guild,
  Channel,
  AutocompleteInteraction,
} from 'discord.js'
import { GUARDS_METADATA } from '../../constants'

import { Logger } from '../../util/Logger'
import type { NonNullObject } from '../../util/types'
import { Part } from '../part/Part'
import type { Guard } from '../guards/Guard'
import { INTERACTION_TYPE_METADATA } from '../../decorators'

export class Command<O extends Command.Options = Command.Options> extends Part {
  public description?: string

  public detailedDescription?: DetailedDescription

  public guards: Guard[] = []

  public readonly category?: readonly string[]

  public typing?: boolean

  private readonly slashOptions?: ApplicationCommandOptionData

  protected logger?: Logger

  public constructor(context: Part.Context, options: O = {} as O) {
    super(context, options)

    if (!this.category) this.category = this.location.directories

    this.logger = new Logger(`COMMAND:${this.name}`)
  }

  public before() {
    console.log(Reflect.getMetadata(INTERACTION_TYPE_METADATA, this))
    this.guards = Reflect.getMetadata(GUARDS_METADATA, this.run as () => void)
    const result = this.container.stores
      ?.get('guards')
      ?.tryActivate(this.guards)
    return result
  }

  public run?(interaction: CommandInteraction): Awaitable<void>

  public contextRun?(
    interaction: ContextMenuCommandInteraction,
  ): Awaitable<void>
}

export interface CommandInteractionParams {
  interaction: CommandInteraction
  extra: {
    member: CommandInteraction['member']
    guild: CommandInteraction['guild']
    channel?: CommandInteraction['channel']
    options: CommandInteraction['options']
  }
}

export interface CommandContextMenuParams {
  interaction: ContextMenuCommandInteraction
  extra: {
    member: ContextMenuCommandInteraction['member']
    guild: ContextMenuCommandInteraction['guild']
    channel?: ContextMenuCommandInteraction['channel']
    options: ContextMenuCommandInteraction['options']
  }
}

export interface AutoCompleteInteractionParams {
  interaction: AutocompleteInteraction
  extra: {
    member: AutocompleteInteraction['member']
    guild: AutocompleteInteraction['guild']
    channel?: AutocompleteInteraction['channel']
    options: AutocompleteInteraction['options']
  }
}

export type CommandReturn = InteractionReplyOptions | string | void

export interface CommandOptions extends Part.Options {
  description?: string

  detailedDescription?: DetailedDescription

  slashOptions?: ApplicationCommandOptionData[]
}

export namespace Command {
  export type Options = CommandOptions
  export type Context = Part.Context

  export type Interaction = CommandInteractionParams
  export type ContextMenuInteraction = CommandContextMenuParams
  export type AutoCompleteInteraction = AutoCompleteInteractionParams
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
