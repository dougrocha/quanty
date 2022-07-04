import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'

import { AppModule } from './app.module'

const ENV = process.env.NODE_ENV

export const prismaStoreClient = new PrismaClient()

export const sessionMiddleware = session({
  name: 'session',
  store: new PrismaSessionStore(prismaStoreClient as any, {
    ttl: 60 * 60 * 24 * 7, // 7 days cookie expiration
    checkPeriod: 24 * 3600, // Time period in seconds
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
    sessionModelName: 'UserSession',
  }),
  cookie: {
    maxAge: 60000 * 60 * 24 * 7,
    secure: ENV === 'production' ? true : false,
  },
  secret: process.env.SESSION_COOKIE,
  resave: false,
  saveUninitialized: false,
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  })

  const configService = app.get(ConfigService)

  const PORT = configService.get('PORT')
  app.setGlobalPrefix('api')

  app.useGlobalPipes(new ValidationPipe())

  app.enableCors({
    origin: configService.get<string>('FRONTEND_URL'),
    credentials: true,
  })

  app.use(cookieParser())

  app.use(sessionMiddleware)

  app.use(passport.initialize())
  app.use(passport.session())

  await app.listen(PORT, async () => {
    console.log('NODE_ENV:', ENV)

    console.log(`Quanty Backend running at ${await app.getUrl()}`)
  })
}

void bootstrap()
