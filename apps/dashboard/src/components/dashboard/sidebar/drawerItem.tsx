import Link from 'next/link'
import { useRouter } from 'next/router'

import type { ISidebarItems } from '../../../data/dashboardSidebarItems'
import HeroIcon from '../../icons/dynamicHeroIcon'

interface IDrawerItem extends ISidebarItems {
  guildId: string | null
  minimized?: boolean
}

const DrawerItem = ({
  name,
  link,
  icon,
  premium,
  guildId,
  minimized,
}: IDrawerItem) => {
  const router = useRouter()

  const isActive =
    `/dashboard/[guildId]${link ? `/${link}` : ''}` == router.pathname

  return (
    <Link
      key={`item-${name}`}
      href={{
        pathname: `/dashboard/${guildId}/${link}`,
      }}
    >
      <a
        className={`flex min-w-max items-center px-2 py-2 hover:text-primary-white ${
          premium && 'text-primary-yellow'
        } ${
          isActive
            ? 'rounded-md bg-primary-purple-20 text-primary-white'
            : 'text-secondary-white'
        } ${minimized && 'flex cursor-pointer justify-center'} `}
      >
        {icon && <HeroIcon name={icon} className="h-6 w-6" outline />}

        <p
          className={`ml-3 origin-left whitespace-nowrap duration-200 ${
            minimized && 'hidden'
          }`}
        >
          {name}
        </p>
      </a>
    </Link>
  )
}

export default DrawerItem
