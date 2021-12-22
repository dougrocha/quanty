import QuantyClient from '../client';
import Logger from './logger';

import { Feature, IFeatureHandler } from '../types';

import { Collection } from 'discord.js';

import { glob } from 'glob';
import { promisify } from 'util';
const globPromise = promisify(glob);

/**
 * Feature Handler
 * ```
 * const client = Discord.client
 * const FeatureHandler = new Feature(client, directory)
 * ```
 */
class FeatureHandler implements IFeatureHandler {
  private logger: Logger = new Logger('Feature-Handler');

  private client: QuantyClient;
  private dir: string;

  public features: Collection<string, Feature> = new Collection();

  /**
   *
   * @param client
   * @param dir
   */
  constructor(client: QuantyClient, dir: string) {
    this.client = client;

    this.dir = dir;

    this.loadFeatures(dir);
  }

  /**
   *  Will load all features in feature folder
   * This includes both regular features and for new interactions
   * @param dir Directory for features/events
   */
  async loadFeatures(dir: string) {
    const featureFiles: string[] = await globPromise(`${dir}/**/*{.ts,.js}`);

    featureFiles.map(async (value: string) => {
      const { feature }: { feature: Feature } = await require(value);

      if (feature.once) {
        this.client.once(feature.name, feature.run.bind(null, this.client));
      } else {
        this.client.on(feature.name, feature.run.bind(null, this.client));
      }

      this.features.set(feature.name, feature);
    });

    this.logger.success('All Features Loaded');
  }
}

export default FeatureHandler;
