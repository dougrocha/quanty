import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core'
import { PrismaClient } from '@prisma/client'
import { PrismaSessionStore } from '@quixo3/prisma-session-store'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import passport from 'passport'

import { AppModule } from './app.module'
import { PrismaClientExceptionFilter } from './prisma-client-exception.filter'

const ENV = process.env.NODE_ENV

export const prismaStoreClient = new PrismaClient()

export const sessionMiddleware = session({
  name: 'session',
  store: new PrismaSessionStore(prismaStoreClient as any, {
    // ttl: 60 * 60 * 24 * 7, // 7 days cookie expiration
    checkPeriod: 24 * 3600, // Time period in seconds
    sessionModelName: 'UserSession',
  }),
  cookie: {
    httpOnly: ENV === 'production' ? true : false,
    maxAge: 60000 * 60 * 24 * 7, // 7 Days
    secure: ENV === 'production' ? true : false,
    domain: ENV === 'production' ? '.quanty.xyz' : undefined,
    sameSite: 'lax',
  },
  secret: process.env.SESSION_COOKIE,
  resave: false,
  saveUninitialized: false,
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  })

  // binds ValidationPipe to the entire application
  app.useGlobalPipes(new ValidationPipe())

  // apply transform to all responses
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))

  // 👇 apply PrismaClientExceptionFilter to entire application, requires HttpAdapterHost because it extends BaseExceptionFilter
  const { httpAdapter } = app.get(HttpAdapterHost)
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

  const configService = app.get(ConfigService)

  const PORT = configService.get('PORT')
  app.setGlobalPrefix('api')

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
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
