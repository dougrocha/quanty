import { NestFactory } from '@nestjs/core'
import MongoStore from 'connect-mongo/build/main/lib/MongoStore'
import session from 'express-session'
import passport from 'passport'

import { AppModule } from './app.module'

const ENV = process.env.NODE_ENV

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const PORT = 3001
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  })

  app.use(
    session({
      name: 'session',
      store: MongoStore.create({
        mongoUrl: process.env.MONGOURI,
        dbName: 'QuantyBotSessions',
        stringify: false,
        ttl: 60 * 60 * 24 * 7, // 7 days cookie expiration
        touchAfter: 24 * 3600, // Time period in seconds
        crypto: {
          secret: process.env.MONGO_STORE_SECRET,
        },
      }),
      cookie: {
        maxAge: 60000 * 60 * 24 * 7,
        // Secure: true,
      },
      secret: process.env.SESSION_COOKIE,
      resave: false,
      saveUninitialized: false,
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(PORT, () => {
    if (ENV) {
      console.log('NODE_ENV: ', ENV)
    }
    console.log(`Quanty Backend listening at port ${PORT}`)
  })
}

void bootstrap()
