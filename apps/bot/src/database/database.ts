import { Logger, logger } from '@quanty/framework'
import { connection, connect } from 'mongoose'

/**
 * Quanty Database class for connecting to MongoDB
 */
class Database {
  @logger()
  private logger: Logger

  private URL: string | undefined

  /**
   * URL for mongodb database
   * @param {mongoURL} [MongoUrl] - URL for mongodb database
   * @param {QuantyClient} [Client] - Discord bot client
   */
  constructor() {
    /**
     * Mongo URL
     */
    this.URL = process.env.MONGOURI

    void this._init()
  }

  async ping(): Promise<number> {
    const currentNano = process.hrtime()
    await connection.db.command({ ping: 1 })
    const time = process.hrtime(currentNano)
    return (time[0] * 1e9 + time[1]) * 1e-6
  }

  private async _init(): Promise<void> {
    if (!this.URL) return

    await connect(this.URL, { keepAlive: true, autoIndex: false })
      .then(() => this.logger.log('Connected to MongoDB'))
      .catch((e: any) => {
        this.logger.error(e)
      })
  }
}

export default new Database()
