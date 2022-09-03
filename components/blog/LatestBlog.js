import React from 'react'
import styles from '../../styles/blog/Blog.module.css';
import Link from "next/link";
import RecentBlogs from './RecentBlogs';


function latestBlog() {
  return (
    <>
    <div className={styles.container}>
        <h2 className={styles.heading}>Latest Blogs</h2>
       <div className={styles.BlogList}>
        <RecentBlogs/>
       </div>
     <Link href="/blogs"><a className='absolute text-red-600 hover:text-white'>More Blogs</a></Link>
    </div>
    </>
  )
}

export default latestBlog