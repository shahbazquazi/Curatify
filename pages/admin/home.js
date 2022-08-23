import React, { useEffect, useState } from 'react';
import styles from '../../styles/blog/Blog.module.css';
import { BsFillPlusCircleFill } from "react-icons/bs";
import Router from "next/router";
import AdminBlog from '../../components/admin/AdminBlog';



function Home() {
   
    const [bloggerName, setBloggerName] = useState("");

    useEffect(() => {
       const data = async () => {
        const rawResponse = await fetch('/api/admin/blogger/details',{
          method: 'GET'
        });
        const response = await rawResponse.json();
        
        if(response.success){
        setBloggerName(response.blogger.name);
        }
      }
      data();
    }, [])
    

    const createBlogHandler = () => {
      Router.push("/admin/blog/create");
    }
    

  return (
    <>
    <div className={styles.container}>
        <div className='ml-5 mb-3'>Welcome <span className='text-red-600'>{bloggerName}</span></div>
        <div className='relative m-5'>
        <BsFillPlusCircleFill className='text-4xl absolute right-0 top-2 hover:text-red-600
        peer' onClick={createBlogHandler}/>
        <span className='absolute right-0 top-11 translate-x-5 invisible peer-hover:visible peer-hover:text-red-600'>Create Blog</span>
        <h2 className={styles.heading}>My Blogs</h2>
       <div className={styles.BlogList}>
        <AdminBlog/>
       </div>
       </div>
       </div>
    </>
  )
}


export default Home