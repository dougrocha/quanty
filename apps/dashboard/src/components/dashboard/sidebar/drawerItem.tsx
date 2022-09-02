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
        className={`py-2 hover:text-primary-white ${
          premium && 'text-primary-yellow'
        } ${
          isActive
            ? 'rounded-md bg-primary-purple-20 text-primary-white'
            : 'text-secondary-white'
        } ${
          minimized
            ? 'mx-auto flex w-min cursor-pointer justify-center px-2'
            : 'flex items-center px-2'
        } `}
      >
        {icon && <HeroIcon name={icon} className="h-6 w-6" outline />}

        <p
          className={` origin-left whitespace-nowrap duration-200 ${
            minimized ? 'hidden' : 'ml-3'
          }`}
        >
          {name}
        </p>
      </a>
    </Link>
  )
}

export default DrawerItem
