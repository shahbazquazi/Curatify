import React from 'react'
import styles from '../../styles/blog/Blog.module.css';
import Blog from './Blog';
import Link from "next/link";


function latestBlog() {
  return (
    <>
    <div className={styles.container}>
        <h2 className={styles.heading}>Latest Blogs</h2>
       <div className={styles.BlogList}>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
       </div>
     <Link href="/blog"><a className='absolute text-red-600 hover:text-white'>More Blogs</a></Link>
    </div>
    </>
  )
}

export default latestBlog