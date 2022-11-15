import type { IconName } from '../components/icons/dynamicHeroIcon'

export interface ISidebarItems {
  name: string
  link: string
  icon?: IconName
  premium?: boolean
}

export interface ISidebarContents {
  title: string | null
  items: ISidebarItems[]
}

export const DefaultCategory: ISidebarItems[] = [
  {
    name: 'Overview',
    link: '',
    icon: 'SquaresPlusIcon',
  },
  {
    name: 'Settings',
    link: 'settings',
    icon: 'Cog8ToothIcon',
  },
  // {
  //   name: 'Premium',
  //   link: 'premium',
  //   icon: 'HeartIcon',
  //   premium: true,
  // },
]

export const ServerManagementCategory: ISidebarItems[] = [
  {
    name: 'Moderation',
    link: 'moderation',
    icon: 'CircleStackIcon',
  },
  {
    name: 'Test',
    link: 'test',
    icon: 'PencilIcon',
  },
  // {
  //   name: 'Custom Commands',
  //   link: 'custom-cmd',
  //   icon: 'PencilAltIcon',
  // },
]

export const sidebarContents: ISidebarContents[] = [
  // {
  //   title: 'Server Management',
  //   items: ServerManagementCategory,
  // },
]

