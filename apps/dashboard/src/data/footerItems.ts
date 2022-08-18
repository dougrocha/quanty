const FooterItems = [
  {
    title: 'Quanty',
    items: [
      {
        name: 'Discord',
        route: process.env.NEXT_PUBLIC_QUANTY_DISCORD_SERVER_INVITE,
      },
      { name: 'Docs', route: process.env.NEXT_PUBLIC_QUANTY_DOCS_URL },
      {
        name: 'Support',
        route: process.env.NEXT_PUBLIC_QUANTY_DISCORD_SERVER_INVITE,
      },
      {
        name: 'GitHub',
        route: process.env.NEXT_PUBLIC_QUANTY_GIT,
      },
    ],
  },
  {
    title: 'Company',
    items: [
      { name: 'Terms of Use', route: '/terms-of-use' },
      { name: 'Privacy Policy', route: '/privacy-policy' },
      {
        name: 'Cookie Policy',
        route: '/cookie-policy',
      },
      {
        name: 'End User License Agreement',
        route: '/end-user-agreement',
      },
    ],
  },
]
// TODO: Possibly change company routes later on

export default FooterItems
