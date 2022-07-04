import type * as OutlineIcons from '@heroicons/react/outline'
import type * as SolidIcons from '@heroicons/react/solid'
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
    ? dynamic(() => import('@heroicons/react/outline').then(mod => mod[name]))
    : dynamic(() => import('@heroicons/react/solid').then(mod => mod[name]))

  return <Icon className={className} aria-hidden={true} />
}

export default HeroIcon
