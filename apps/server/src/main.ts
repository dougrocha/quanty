import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { PrismaClient } from '@prisma/client'
import compression from 'compression'
import connectRedis from 'connect-redis'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'
import { createClient } from 'redis'

import { AppModule } from './app.module'

const ENV = process.env.NODE_ENV

export const prismaStoreClient = new PrismaClient()

const RedisStore = connectRedis(session)

export const redisClient = createClient({
  url: process.env.REDIS_URL,
  legacyMode: true,
})

redisClient
  .connect()
  .then(() => {
    Logger.log('Redis client connected')
  })
  .catch(err => {
    Logger.log(err)
  })

export const useSessionMiddleware = session({
  store: new RedisStore({ client: redisClient }),
  cookie: {
    httpOnly: true,
    maxAge: 60000 * 60 * 24 * 7, // 7 Days
    secure: ENV === 'production',
    domain: ENV === 'production' ? '.quanty.xyz' : 'localhost',
  },
  secret: process.env.SESSION_COOKIE,
  resave: false,
  saveUninitialized: false,
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  })

  // Binds ValidationPipe to the entire application
  app.useGlobalPipes(new ValidationPipe())

  const configService = app.get(ConfigService)

  const PORT = configService.get('PORT')
  app.setGlobalPrefix('api')

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  })

  app.use(useSessionMiddleware)

  app.use(cookieParser())

  app.use(compression())

  app.use(passport.initialize())
  app.use(passport.session())

  // Only show for dev setup
  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Quanty API')
      .setDescription('API for Quanty Dashboard')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
  }

  // if (process.env.NODE_ENV === 'production') {
  //   app.use(helmet())
  // }

  app.enableShutdownHooks()

  await app.listen(PORT, async () => {
    Logger.log(`NODE_ENV: ${ENV}`)

    Logger.log(`Quanty Backend running at ${await app.getUrl()}`)
  })
}

void bootstrap()
