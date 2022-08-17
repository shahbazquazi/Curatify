import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <>
    <footer className='flex flex-col justify-center items-center text-white h-24'>
        <p>Copyright &#169; 2022 | Curatify | <Link href="/admin/login"><a className='text-red-600 hover:text-white'> Admin </a></Link></p>
    </footer>
    </>
  )
}

export default Footer