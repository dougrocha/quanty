import consola, { Consola, logType } from 'consola'

import chalk from 'chalk'

import { ILogger } from '../types'

/**
 * Logger class for easy and identifiable console logging
 */
class Logger implements ILogger {
  private logger: Consola = consola

  private name: string

  /**
   * @param {string} [name] - Name for this logger
   */
  constructor(name: string, initLog?: boolean) {
    this.name = name

    if (initLog !== false) {
      this.log(`Initialized`)
    }
  }

  log(msg: string, ...extra: any[]): void {
    this.emitLogMessage('log', msg, extra)
  }

  debug(msg: string): void {
    this.emitLogMessage('debug', msg)
  }

  warn(msg: string, ...error: any[]): void {
    this.emitLogMessage('warn', msg, error)
  }

  error(msg: string, error?: any): void {
    this.emitLogMessage('error', msg, error)
  }

  info(msg: string): void {
    this.emitLogMessage('info', msg)
  }

  success(msg: string): void {
    this.emitLogMessage('success', msg)
  }

  fatal(msg: Error | string, error?: any): void {
    this.emitLogMessage('fatal', msg, error)
  }

  private emitLogMessage(msgType: logType, msg: string | Error, extra?: any[]) {
    const name = this.name

    switch (msgType) {
      case 'log':
        this.logger.log(baseLog('#ffd966'), msg)

        if (extra) {
          this.printExtras(msgType, extra)
        }
        break
      case 'debug':
        this.logger.debug(
          chalk.hex('#008000')('DEBUG'),
          baseLog('#0096FF'),
          msg,
        )
        break
      case 'error':
        this.logger.error(baseLog('#FFA500'), msg, extra)
        break
      case 'info':
        this.logger.log(baseLog('#0096FF'), msg)
        break
      case 'warn':
        this.logger.warn(baseLog('#FFEA00'), msg)

        if (extra) {
          this.printExtras(msgType, extra)
        }
        break
      case 'success':
        this.logger.log(baseLog('#3FD02E'), msg)
        break
      case 'fatal':
        this.logger.fatal(baseLog('#FF0000'), msg)
        if (extra) {
          this.printExtras(msgType, extra)
        }
        break
    }

    function baseLog(color: string) {
      return `${chalk.hex('#ffd966')('Quanty -')} ${new Date()
        .toLocaleDateString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')}, ${new Date()
        .toLocaleTimeString()
        .replace(/T/, ' ')
        .replace(/\..+/, '')
        .padEnd(13)}${chalk.hex(color)(`[${name}]`)}`
    }
  }

  private printExtras(msgType: logType, extra: any[]) {
    extra?.forEach(message => {
      const output =
        typeof message == 'object'
          ? `${chalk.hex('#125755')('Object:')}\n${JSON.stringify(
              message,
              (key, value) =>
                typeof value === 'bigint' ? value.toString() : value,
              2,
            )}\n`
          : message
      this.emitLogMessage(msgType, output)
    })
  }
}

export default Logger
