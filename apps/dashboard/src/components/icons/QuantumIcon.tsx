import { Icon, IconProps } from '@iconify/react'

export const QuantumIcon = ({
  className,
  color,
  ...props
}: Partial<IconProps>) => {
  return (
    <Icon
      {...props}
      className={'cursor-pointer '.concat(className ?? '')}
      icon={'clarity:atom-solid'}
      color={color}
    />
  )
}
