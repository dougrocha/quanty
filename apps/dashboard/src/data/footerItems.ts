import { StaticLinks } from '../utils/staticLinks'

const FooterItems = [
  {
    title: 'Quanty',
    items: [
      { name: 'Discord', route: StaticLinks.QUANTY_SERVER_INVITE },
      { name: 'Docs', route: '/docs' },
      {
        name: 'Support',
        route: StaticLinks.QUANTY_SERVER_INVITE,
      },
      {
        name: 'GitHub',
        route: '/github',
      },
    ],
  },
  {
    title: 'Company',
    items: [
      { name: 'Terms of Use', route: '/policy' },
      { name: 'Privacy Policy', route: '/policy' },
      {
        name: 'Cookie Policy',
        route: '/policy',
      },
      {
        name: 'End User License Agreement',
        route: '/policy',
      },
    ],
  },
]
// TODO: Possibly change company routes later on

export default FooterItems
