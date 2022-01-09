import { connection, connect } from 'mongoose'

import QuantyClient from '../client'
import { QuantyLogger } from '../structures'
import { IDatabase } from '../types'

/**
 * Quanty Database class for connecting to MongoDB
 */
export default class Database implements IDatabase {
  private logger: QuantyLogger = new QuantyLogger('Database')

  private URL: string | undefined

  private client: QuantyClient

  /**
   * URL for mongodb database
   * @param {mongoURL} [MongoUrl] - URL for mongodb database
   * @param {QuantyClient} [Client] - Discord bot client
   */
  constructor(client: QuantyClient, mongoURL?: string) {
    /**
     * Mongo URL
     */
    this.URL = mongoURL

    /**
     * Client/Bot Class
     */
    this.client = client
  }

  async ping(): Promise<number> {
    const currentNano = process.hrtime()
    await connection.db.command({ ping: 1 })
    const time = process.hrtime(currentNano)
    return (time[0] * 1e9 + time[1]) * 1e-6
  }

  public async initDBProvider(URL: string): Promise<void> {
    await connect(URL, { keepAlive: true, autoIndex: false })
      .then(() => this.logger.success('Connected to MongoDB'))
      .catch((e: any) => {
        this.logger.warn('Connection to mongoDB failed.', e)
      })
  }
}
