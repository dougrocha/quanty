import { Icon, IconProps } from '@iconify/react'

export const GithubIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="akar-icons:github-fill" />
}

export const MailIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="codicon:mail" />
}

export const HamBurgerIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="charm:menu-hamburger" />
}

export const ClosedHamburgerIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="heroicons-outline:x" />
}

export const LoadingIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="eos-icons:loading" />
}
export const ExternalLinkIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="charm:link-external" />
}
export const SearchIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="eva:search-fill" />
}
export const SendIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="akar-icons:send" />
}
export const FilterIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="fluent:arrow-sort-down-lines-24-regular" />
}
export const ClipboardIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="bi:clipboard" />
}
export const ClipboardCheckIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="bi:clipboard-check" />
}
export const QuantumIcon = ({ ...props }: Partial<IconProps>) => {
  return <BaseIcon {...props} icon="clarity:atom-solid" />
}

const BaseIcon = ({ icon, className, color, ...props }: Partial<IconProps>) => {
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
