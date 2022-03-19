import React from 'react'

const Navbar = () => {
  const handleLogin = () => {
    window.location.assign(`http://localhost:3001/api/auth/login`)
  }
  return (
    <nav className="flex h-20 items-center justify-between text-sm ">
      <ul className="flex space-x-5">
        <li>Home</li>
        <li>Plugins</li>
        <li>Support</li>
        <li>Docs</li>
      </ul>
      <div>
        <button
          className="rounded-lg bg-primary-bright-purple py-2 px-4"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </nav>
  )
}

export default Navbar
