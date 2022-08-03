import { NextRequest, NextResponse } from 'next/server'

export async function middleware(req: NextRequest) {
  const sessionId = req.cookies.get('connect.sid')

  await fetch(`${process.env.SERVER_URL}/api/user/protected`, {
    method: 'GET',
    headers: { 'connect.sid': sessionId ?? '' },
    redirect: 'manual',
  })
    .then(() => {
      return NextResponse.next()
    })
    .catch(() => {
      const url = req.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.rewrite(url)
    })
}

export const config = {
  matcher: '/dashboard/:guildId*',
}
