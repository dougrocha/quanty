import { connection, connect } from 'mongoose';
import QuantyClient from '../client';

import { QuantyLogger } from '../structures';
import { IDatabase } from '../types';

/**
 * Quanty Database class for connecting to MongoDB
 */
class Database implements IDatabase {
  private logger: QuantyLogger = new QuantyLogger('Database');

  private URL: string | undefined;
  private client: QuantyClient;

  /**
   * URL for mongodb database
   * @param {mongoURL} [MongoUrl] - URL for mongodb database
   * @param {QuantyClient} [Client] - Discord bot client
   */
  constructor(mongoURL: string | undefined, client: QuantyClient) {
    /**
     * Mongo URL
     */
    this.URL = mongoURL;

    /**
     * Client/Bot Class
     */
    this.client = client;

    // Connects to mongoDB if URL exists
    if (this.URL) {
      this.initDBProvider(this.URL);
    } else {
      this.logger.log(
        'MongoDB cannot start without a URL. Bot will start without Database.'
      );
    }
  }
  async ping(): Promise<number> {
    const currentNano = process.hrtime();
    await connection.db.command({ ping: 1 });
    const time = process.hrtime(currentNano);
    return (time[0] * 1e9 + time[1]) * 1e-6;
  }

  private async initDBProvider(URL: string): Promise<void> {
    await connect(URL, { keepAlive: true, autoIndex: false })
      .then(() => this.logger.success('Connected to MongoDB'))
      .catch((e: any) => {
        this.logger.warn('Connection to mongoDB failed.', e);
      });
  }
}

export default Database;
