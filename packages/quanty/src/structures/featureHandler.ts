import { PathLike } from 'fs'
import { promisify } from 'util'

import { Collection } from 'discord.js'
import { glob } from 'glob'

import Logger from './Logger'

import QuantyClient from '../client'
import { BaseFeature, IFeatureHandler } from '../types'

const globPromise = promisify(glob)

interface FeatureImport {
  feature: BaseFeature
}

/**
 * Feature Handler
 * ```
 * const client = Discord.client
 * const FeatureHandler = new Feature(client, directory)
 * ```
 */
class FeatureHandler implements IFeatureHandler {
  private logger: Logger = new Logger('Feature-Handler')

  private client: QuantyClient

  private dir: PathLike

  public features: Collection<string, BaseFeature> = new Collection()

  /**
   *
   * @param client
   * @param dir
   */
  constructor(client: QuantyClient, dir: PathLike) {
    this.client = client

    this.dir = dir

    this.client.once('ready', async () => {
      await this.init()
    })
  }

  /**
   *  Will load all features in feature folder
   * This includes both regular features and for new interactions
   * @param dir Directory for features/events
   */
  private async init() {
    const featureFiles: string[] = await globPromise(
      `${this.dir}/**/*{.ts,.js}`,
    )

    const loadFeatures = async () => {
      featureFiles.map(async (value: string) => {
        const { feature } = (await require(value)) as FeatureImport

        if (feature.once) {
          this.client.once(feature.name, feature.run.bind(null, this.client))
        } else {
          this.client.on(feature.name, feature.run.bind(null, this.client))
        }

        this.features.set(feature.name, feature)
      })
    }

    await loadFeatures().then(() => this.logger.success('Features Loaded'))
  }
}

export default FeatureHandler
