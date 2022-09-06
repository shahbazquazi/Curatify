import React from "react";
import styles from "../../styles/blog/Blog.module.css";
import Link from "next/link";

function Blog({blogs}) {

  return (
    <>
    {blogs && blogs.map((blog)=>{
      return (
        <Link key={blog._id} href={`/blogpost/${blog.title.replace(/\s/g, '+')}`}>
        <a className={styles.homeBlogsContainer}>
          <div className={styles.blogSection}>
          <div className= {styles.leftSection}>
             <img className={styles.image} src={blog.image[0].url} alt="No image found" />
          </div>
          <div className={styles.rightSection}>
          <h3 className={styles.title}>{blog.title}</h3>
          <p className={styles.description}>
            {blog.description}
          </p>
          </div>
          </div>
        </a>
      </Link>
      )

    })}
      
    </>
  );
}


export default Blog;
