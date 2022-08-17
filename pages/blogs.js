import React from 'react'
import Blog from '../components/blog/Blog';
import styles from '../styles/blog/Blog.module.css';

function blogs() {
  return (
    <>
    <img className="absolute top-0 w-screen opacity-30" src="/blogBg.jpg" />
    <div className={styles.container}>
        <h2 className={styles.heading}>Blogs</h2>
       <div className={styles.BlogList}>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
        <Blog/>
       </div>
       </div>
       
       
    </>
  )
}

export default blogs