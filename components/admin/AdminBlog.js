import React, { useEffect, useState } from "react";
import styles from "../../styles/blog/Blog.module.css";
import Link from "next/link";

function AdminBlog() {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      const rawResponse = await fetch(`/api/admin/blog/fetchall`, {
        method: "GET",
      });
    
      const response = await rawResponse.json();

      if(response.success) {
        setBlogs(response.blogs);
      }
    }
    getBlogs();
  }, [])
  

  return (
    
    <>
    {blogs.map((blog)=>{
      return (
        <Link key={blog._id} href={`/admin/blogpost/${blog.title.replace(/\s/g, '+')}`}>
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


export default AdminBlog;
