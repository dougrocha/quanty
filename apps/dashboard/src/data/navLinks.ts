import { StaticLinks } from '../utils/constants/API'

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
    path: StaticLinks.QUANTY_SERVER_INVITE,
  },
  {
    name: 'Docs',
    path: '/docs',
  },
]
