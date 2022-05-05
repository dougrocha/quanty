import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const validateCookies = () => {
    const sessionId = req.cookies['session']

    return sessionId
      ? {
          Cookie: `session=${sessionId}`,
        }
      : false
  }

  const headers = validateCookies()

  const url = req.nextUrl.clone()
  url.pathname = '/dashboard'

  if (!headers) return NextResponse.rewrite(url)
}
