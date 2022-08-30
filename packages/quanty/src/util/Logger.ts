import readline from 'readline'

import chalk, { Chalk } from 'chalk'
import type { DiscordAPIError } from 'discord.js'

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
   * @param {String} name - Name of class.
   * @returns Formatted prompt with data and name.
   *
   * @example
   * const formattedText = Logger.format()
   * formattedText = `[23:13:29 AM/PM] [APPLICATION]`
   *
   * @example
   * const formattedText = Logger.format('MyClass')
   * formattedText = `[23:13:29 AM/PM] [MYCLASS]`
   */
  private static format(name: string, color: keyof chalk.Chalk = 'gray') {
    return (chalk[color] as Chalk)(
      `[${new Date().toLocaleTimeString()}] [${name}] `,
    )
  }

  /**
   * Logger name.
   */
  private readonly name: string

  /**
   *
   */
  private readonly options?: Logger.Options

  /**
   * @constructor
   * @param {String} name - Logger name. Will default to 'application' if empty.
   * @param {Object} options - Logger options.
   */
  constructor(name?: string, options?: Logger.Options) {
    if (!name) name = 'application'
    this.name = name.toUpperCase()

    this.options = options
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
      const { name, message, stack, code, method, url } = err as DiscordAPIError
      const msg =
        Logger.format(this.name) +
        `${chalk.red(name)}: ${chalk.redBright(
          message + ' [Code ' + code + ']',
        )}
        ${chalk.gray(stack?.split('\n').slice(1).join('\n'))} ${chalk.white(
          'Path: ' + url,
        )} 
        ${chalk.white('Method: ' + method)}`

      Logger.write(msg)
    }
  }

  public warn(text: string) {
    if (process.env.LOG_LEVEL !== 'ERROR') {
      const msg = Logger.format(this.name) + chalk.yellow(text)
      Logger.write(msg)
    }
  }

  public log(text: string, color?: keyof Chalk): void {
    if (process.env.LOG_LEVEL === 'DEBUG' || process.env.LOG_LEVEL === 'ALL') {
      if (!color) color = 'white'

      const msg = Logger.format(this.name) + (chalk[color] as Chalk)(text)

      Logger.write(msg)
    }
  }

  public debug(text: string) {
    if (process.env.LOG_LEVEL === 'DEBUG' || process.env.LOG_LEVEL === 'ALL') {
      const msg = Logger.format(this.name) + chalk.magenta(text)
      Logger.write(msg)
    }
  }

  /**
   * Clear last line printed on the console.
   */
  public clearLastLine() {
    readline.moveCursor(process.stdout, 0, -1)
    readline.clearLine(process.stdout, 1)
  }
}

export namespace Logger {
  export interface Options {
    placeholder?: string
  }
}

/**
 * @param name - Name of class. Will default to class name if not provided.
 * @param options - Options for logger.
 * @returns Logger instance.
 */
export function logger(
  name?: string,
  options?: Logger.Options,
): PropertyDecorator {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (target: Object, propertyKey: string | symbol) {
    if (!name) name = target.constructor.name

    name = name?.toUpperCase()

    const logger = new Logger(name, options)

    Object.defineProperty(target, propertyKey, {
      value: logger,
      enumerable: true,
      configurable: false,
    })
  }
}
