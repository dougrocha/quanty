export interface ISidebaritems {
  name: string
  link: string
  icon?: string
  premium?: boolean
}

export interface ISidebarContents {
  title: string | null
  items: ISidebaritems[]
}

export const DefaultCategory: ISidebaritems[] = [
  {
    name: 'Overview',
    link: '',
    icon: 'material-symbols:dashboard-outline-rounded',
  },
  {
    name: 'Settings',
    link: 'settings',
    icon: 'bx:cog',
  },
  {
    name: 'Premium',
    link: 'premium',
    icon: 'clarity:atom-solid',
    premium: true,
  },
]

export const ServerManagementCategory: ISidebaritems[] = [
  {
    name: 'Moderation',
    link: 'moderation',
    icon: 'fluent:wrench-20-regular',
  },
  {
    name: 'Custom Commands',
    link: 'custom-cmd',
    icon: 'jam:write',
  },
]

export const sidebarContents: ISidebarContents[] = [
  {
    title: 'Server Management',
    items: ServerManagementCategory,
  },
]
