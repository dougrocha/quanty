import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import session from 'express-session';
import passport from 'passport';
import MongoStore from 'connect-mongo/build/main/lib/MongoStore';

const ENV = process.env.NODE_ENV;

async function bootstrap() {
  if (ENV) {
    console.log('NODE_ENV: ', ENV);
  }
  const app = await NestFactory.create(AppModule);
  const PORT = 3001;
  app.setGlobalPrefix('api');
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  app.use(
    session({
      name: 'session',
      store: MongoStore.create({
        mongoUrl: process.env.MONGOURI,
        dbName: 'QuantyBotSessions',
        stringify: false,
        ttl: 60 * 60 * 24 * 7, // 7 days cookie expiration
        touchAfter: 24 * 3600, // time period in seconds
        crypto: {
          secret: process.env.MONGO_STORE_SECRET,
        },
      }),
      cookie: {
        maxAge: 60000 * 60 * 24,
      },
      secret: process.env.SESSION_COOKIE,
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(PORT, () => {
    console.log(`Quanty Backend listening at port ${PORT}`);
  });
}

bootstrap();
