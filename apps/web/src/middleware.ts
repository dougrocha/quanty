import { NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /images (inside /public)
     * 4. all root files inside /public (e.g. /favicon.ico)
     */
    '/',
  ],
}

export default function middleware(req: NextRequest) {
  const url = req.nextUrl

  console.log('req.url', req.url)

  // Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
  const hostname = req.headers.get('host') || 'demo.vercel.pub'

  // Get the pathname of the request (e.g. /, /about, /blog/first-post)
  const path = url.pathname

  console.log('hostname', hostname, 'path', path, 'url', url)

  /*  You have to replace ".vercel.pub" with your own domain if you deploy this example under your domain.
      You can also use wildcard subdomains on .vercel.app links that are associated with your Vercel team slug
      in this case, our team slug is "platformize", thus *.platformize.vercel.app works. Do note that you'll
      still need to add "*.platformize.vercel.app" as a wildcard domain on your Vercel dashboard. */
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.quanty.xyz`, '')
      : hostname.replace(`.localhost:3000`, '')

  // rewrite subdomain `docs` to `/docs` folder
  if (currentHost === 'docs') {
    console.log('rewriting to', `/docs${path}`)
    console.log(
      'rewriting to new url',
      new URL(`/docs${path}`, req.url).toJSON(),
    )
    return NextResponse.rewrite(new URL(`/docs${path}`, req.url))
  }

  // // rewrite root application to `/home` folder
  // if (hostname === 'localhost:3000' || hostname === 'platformize.vercel.app') {
  //   console.log('rewriting to', `/home${path}`)
  //   return NextResponse.rewrite(new URL(`/home${path}`, req.url))
  // }

  // console.log('rewriting to', `/_sites/${currentHost}${path}`)

  // // rewrite everything else to `/_sites/[site] dynamic route
  // return NextResponse.rewrite(new URL(`/_sites/${currentHost}${path}`, req.url))
}
