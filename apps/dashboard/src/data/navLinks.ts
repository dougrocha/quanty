interface INavLinks {
  name: string
  path: string
}

export const NavLinksData: INavLinks[] = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'Plugins',
    path: '/plugins',
  },
  {
    name: 'Support',
    path: process.env.NEXT_PUBLIC_QUANTY_DISCORD_SERVER_INVITE ?? '/404',
  },
  {
    name: 'Docs',
    path: '/docs',
  },
]
