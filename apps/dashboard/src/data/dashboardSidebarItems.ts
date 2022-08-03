import { IconName } from '../components/Icons/DynamicHeroIcon'

export interface ISidebaritems {
  name: string
  link: string
  icon?: IconName
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
    icon: 'ViewGridIcon',
  },
  {
    name: 'Settings',
    link: 'settings',
    icon: 'CogIcon',
  },
  {
    name: 'Premium',
    link: 'premium',
    icon: 'HeartIcon',
    premium: true,
  },
]

export const ServerManagementCategory: ISidebaritems[] = [
  {
    name: 'Moderation',
    link: 'moderation',
    icon: 'AnnotationIcon',
  },
  {
    name: 'Custom Commands',
    link: 'custom-cmd',
    icon: 'PencilAltIcon',
  },
]

export const sidebarContents: ISidebarContents[] = [
  {
    title: 'Server Management',
    items: ServerManagementCategory,
  },
]
