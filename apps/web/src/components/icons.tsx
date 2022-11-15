import { Icon, IconProps } from '@iconify/react'

export const GithubIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="akar-icons:github-fill" />
}

export const BaseIcon = ({
  icon,
  className,
  color,
  ...props
}: Partial<IconProps>) => {
  return (
    <>
      {icon && (
        <Icon
          {...props}
          className={'cursor-pointer '.concat(className ?? '')}
          icon={icon}
          color={color}
        />
      )}
    </>
  )
}
