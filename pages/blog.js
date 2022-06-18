import React from 'react'
import styles from '../styles/blog/Blog.module.css';
import HomeBlogs from '../components/blog/HomeBlogs';


function blog() {
  return (
    <>
    <img className="absolute top-0 w-screen opacity-30" src="/blogBg.jpg" />
    <div className={styles.container}>
        <h2 className={styles.heading}>Blogs</h2>
       <div className={styles.BlogList}>
        <HomeBlogs/>
        <HomeBlogs/>
        <HomeBlogs/>
        <HomeBlogs/>
        <HomeBlogs/>
        <HomeBlogs/>
        <HomeBlogs/>
        <HomeBlogs/>
       </div>
       </div>
       
    </>
  )
}

export default blog