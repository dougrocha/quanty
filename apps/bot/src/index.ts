import * as dotenv from 'dotenv';
dotenv.config({ path: '.env' });

import { join } from 'path';
import QuantyClient from '../quanty/index';

const client = new QuantyClient({
  token: process.env.TOKEN,
  testToken: process.env.TEST_TOKEN,
  mongoUri: process.env.MONGOURI,
  WSUrl: process.env.WS_URL,
  botOwners: ['571520537587875851'],
  commandsDir: join(__dirname, 'commands'),
  featuresDir: join(__dirname, 'features'),
  testServers: ['871581301713555526'],
  devMode: true,
});

export default client;
