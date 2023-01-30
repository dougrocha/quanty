interface HamburgerMenuIconProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const HamburgerMenuIcon = ({ open, setOpen }: HamburgerMenuIconProps) => {
  return (
    <button
      className="relative h-10 w-10 focus:outline-none md:hidden"
      onClick={() => setOpen(!open)}
    >
      <span className="sr-only">Open Menu</span>
      <div className="absolute left-1/2 top-1/2 block w-5 -translate-x-1/2 -translate-y-1/2 transform">
        <span
          aria-hidden
          className={`absolute block h-0.5 w-5 transform bg-secondary-white transition duration-150 ease-in-out ${
            open && 'rotate-45'
          } ${!open && '-translate-y-1.5'}`}
        ></span>
        <span
          aria-hidden
          className={`absolute block h-0.5 w-5 transform bg-secondary-white transition duration-150 ease-in-out ${
            open && 'opacity-0'
          }`}
        ></span>
        <span
          aria-hidden
          className={`absolute block h-0.5 w-5 transform bg-secondary-white transition duration-150 ease-in-out ${
            open && ' -rotate-45'
          } ${!open && 'translate-y-1.5'}`}
        ></span>
      </div>
    </button>
  )
}

export default HamburgerMenuIcon
