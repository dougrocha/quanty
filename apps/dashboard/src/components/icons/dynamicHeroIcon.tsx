import type * as OutlineIcons from '@heroicons/react/24/outline'
import type * as SolidIcons from '@heroicons/react/24/solid'
import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

export type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons

interface Props {
  name: IconName
  className?: string
  outline?: boolean
}

const HeroIcon = ({ name, className = '', outline = false }: Props) => {
  const Icon: ComponentType<{ className: string }> = outline
    ? dynamic(() =>
        import('@heroicons/react/24/outline').then(mod => mod[name]),
      )
    : dynamic(() => import('@heroicons/react/24/solid').then(mod => mod[name]))

  return <Icon className={className} aria-hidden={true} />
}

export default HeroIcon

