import React from 'react'
import styles from '../../styles/blog/Blog.module.css';
import HomeBlogs from './HomeBlogs';
import Link from "next/link";


function latestBlog() {
  return (
    <>
    <div className={styles.container}>
        <h2 className={styles.heading}>Latest Blogs</h2>
       <div className={styles.BlogList}>
        <HomeBlogs/>
        <HomeBlogs/>
        <HomeBlogs/>
        <HomeBlogs/>
       </div>
      <Link href="#"><a className="text-red-600 font-semibold hover:text-white">For More Blogs</a></Link>
    </div>
    </>
  )
}

export default latestBlog