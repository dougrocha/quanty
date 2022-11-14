import Link from 'next/link'
import { AnchorHTMLAttributes } from 'react'

const CustomLink = ({
  href,
  ...rest
}: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isInternalLink = href && href.startsWith('/')
  const isAnchorLink = href && href.startsWith('#')

  if (isInternalLink || isAnchorLink) {
    return <Link href={href} {...rest} />
  }

  return <a target="_blank" rel="noopener noreferrer" href={href} {...rest} />
}

export default CustomLink

