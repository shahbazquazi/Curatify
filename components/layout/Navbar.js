import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
    <>
     <nav className="relative text-white flex justify-center items-center text-center h-20 z-10">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 ">
            <img className="invert w-10 my-3" src="/icon.png" alt="curatify" />
            <h1 className="text-xl">Curatify</h1>
          </div>

          <ul className="flex space-x-6 font-semibold">
            <Link href="/"><li className="cursor-pointer hover:text-red-600">Home</li></Link>
            <Link href="/about"><li className="cursor-pointer hover:text-red-600">About</li></Link>
            <Link href="/contact"><li className="cursor-pointer hover:text-red-600">Contact</li></Link>
            <Link href="/blog"><li className="cursor-pointer hover:text-red-600">Blog</li></Link>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar