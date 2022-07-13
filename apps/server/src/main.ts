import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'

import { AppModule } from './app.module'

const ENV = process.env.NODE_ENV

export const prismaStoreClient = new PrismaClient()

export const useSessionMiddleware: any = session({
  store: new PrismaSessionStore(prismaStoreClient as any, {
    // Ttl: 60 * 60 * 24 * 7, // 7 days cookie expiration
    checkPeriod: 24 * 3600, // Time period in seconds
    sessionModelName: 'UserSession',
  }) as any,
  cookie: {
    httpOnly: ENV === 'production' ? true : false,
    maxAge: 60000 * 60 * 24 * 7, // 7 Days
    secure: false,
    domain: ENV === 'production' ? '.quanty.xyz' : undefined,
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

  app.use(cookieParser())

  app.use(useSessionMiddleware)

  app.use(passport.initialize())
  app.use(passport.session())

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('Quanty API')
      .setDescription('API for Quanty Dashboard')
      .setVersion('1.0')
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('api', app, document)
  }

  await app.listen(PORT, async () => {
    console.log('NODE_ENV:', ENV)

    console.log(`Quanty Backend running at ${await app.getUrl()}`)
  })
}

void bootstrap()
