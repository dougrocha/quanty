import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import MongoStore from 'connect-mongo/build/main/lib/MongoStore'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  })

  const configService = app.get(ConfigService)

  const ENV = configService.get('NODE_ENV')

  const PORT = configService.get('PORT')
  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    credentials: true,
  })

  app.use(cookieParser())

  app.use(
    session({
      name: 'session',
      store: MongoStore.create({
        mongoUrl: configService.get<string>('MONGO_URI'),
        dbName: 'QuantyBotSessions',
        stringify: false,
        ttl: 60 * 60 * 24 * 7, // 7 days cookie expiration
        touchAfter: 24 * 3600, // Time period in seconds
        crypto: {
          secret: configService.get<string>('MONGO_STORE_SECRET') || '',
        },
      }),
      cookie: {
        maxAge: 60000 * 60 * 24 * 7,
        secure: ENV === 'production' ? true : false,
      },
      secret: configService.get<string>('SESSION_COOKIE') || '',
      resave: false,
      saveUninitialized: false,
    }),
  )

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(PORT, async () => {
    console.log('NODE_ENV: ', ENV)

    console.log(`Quanty Backend running at ${await app.getUrl()}`)
  })
}

void bootstrap()
