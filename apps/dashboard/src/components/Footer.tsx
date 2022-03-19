import Link from 'next/link'
import React from 'react'

import Copyright from './Copyright'

import FooterItems from '../data/footerItems'

const Footer = () => {
  return (
    <footer className="mx-auto mt-10 h-72 max-w-6xl items-center justify-between px-4 text-sm text-primary-white sm:px-6 md:flex md:flex-row-reverse xl:px-0">
      <FooterTags />
      <div className="flex flex-col justify-end">
        <Copyright />
      </div>
    </footer>
  )
}

const FooterTags = () => {
  return (
    <div className="flex flex-col md:flex-row md:space-x-10">
      {FooterItems.map(({ items, title }) => {
        return (
          <ul className="list" key={title}>
            <div className="mb-4 font-semibold">{title}</div>
            <div className="text-secondary-white">
              {items.map(({ name, route }) => {
                return (
                  <div className="mb-6" key={name}>
                    <Link href={route} passHref>
                      <a className="item">{name}</a>
                    </Link>
                  </div>
                )
              })}
            </div>
          </ul>
        )
      })}
    </div>
  )
}

export default Footer
