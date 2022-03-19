import chalk, { Chalk } from 'chalk'
import { DiscordAPIError } from 'discord.js'
import moment from 'moment'

/**
 * Logger class
 */
export class Logger {
  /**
   * Prints text followed by a new line.
   * @static
   * @param text text - Text to print.
   */
  private static write(text: string) {
    process.stdout.write(`${text}\n`)
  }

  /**
   * @param {String} name -  Name of class.
   * @returns Formatted prompt with data and name.
   *
   * @example
   * const formattedText = Loggerr.format('EventLoader')
   *
   * formattedText = `[23:13:29] [EventLoader]`
   *
   */
  private static format(name: string) {
    return chalk.gray(`[${moment().format('HH:mm:ss')}] [${name}] `)
  }

  /**
   * Logger name.
   */
  private readonly name: string

  /**
   * @constructor
   * @param {String} name - Logger name.
   */
  constructor(name: string) {
    this.name = name.toUpperCase()
  }

  public rawLog(msg: string) {
    Logger.write(msg)
  }

  public error(err: string | Error | DiscordAPIError) {
    if (!err) return
    if (typeof err === 'string' || !err.stack) {
      const msg = Logger.format(this.name) + chalk.red(err)
      Logger.write(msg)
    } else if (err.name !== 'DiscordAPIError') {
      const [name, ...stack] = err.stack?.split('\n')
      const msg =
        Logger.format(this.name) +
        `${chalk.red(name)}\n${chalk.gray(stack.join('\n'))}`
      Logger.write(msg)
    } else {
      const { name, message, stack, code, method, path } =
        err as DiscordAPIError
      const msg =
        Logger.format(this.name) +
        `${chalk.red(name)}: ${chalk.redBright(
          message + ' [Code ' + code + ']',
        )} 
        ${chalk.gray(stack?.split('\n').slice(1).join('\n'))} ${chalk.white(
          'Path: ' + path,
        )} 
        ${chalk.white('Method: ' + method)}`

      Logger.write(msg)
    }
  }

  public warn(text: string) {
    if (process.env.LOGLEVEL !== 'ERROR') {
      const msg = Logger.format(this.name) + chalk.yellow(text)
      Logger.write(msg)
    }
  }

  public log(text: string, color?: keyof Chalk): void {
    if (process.env.LOGLEVEL === 'DEBUG' || process.env.LOGLEVEL === 'ALL') {
      if (!color) color = 'white'

      const msg = Logger.format(this.name) + (chalk[color] as Chalk)(text)

      Logger.write(msg)
    }
  }

  public debug(text: string) {
    if (process.env.LOGLEVEL === 'DEBUG') {
      const msg = Logger.format(this.name) + chalk.magenta(text)
      Logger.write(msg)
    }
  }

  /**
   * Clear last line printed on the console.
   */
  public clearLastLine() {
    process.stdout.moveCursor(0, -1)
    process.stdout.clearLine(1)
  }
}

export function logger(name?: string): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Object, propertyKey: string | symbol) {
    if (!name) name = target.constructor.name

    name = name?.toUpperCase()

    const logger = new Logger(name)

    Object.defineProperty(target, propertyKey, {
      value: logger,
    })
  }
}
