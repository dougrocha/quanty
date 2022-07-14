import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  const validateCookies = () => {
    const sessionId = req.cookies['connect.sid']
    console.log(req.cookies)
    return sessionId
      ? {
          Cookie: `connect.sid=${sessionId}`,
        }
      : false
  }
  const headers = validateCookies()

  const url = req.nextUrl.clone()
  url.pathname = '/dashboard'
  if (!headers) return NextResponse.rewrite(url)
}
