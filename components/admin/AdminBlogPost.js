import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";


function AdminBlogPost() {
    const editHandler = () => {
        console.log("edit");
     }
 
     const deleteHandler = () => {
         console.log("delete");
     }
  return (
    <div className='relative w-4/5 mt-28 m-auto border border-red-600'>
    <h1 className='text-white text-center text-2xl m-10 pb-5 border-b  border-white '>Title</h1>
    <FaEdit className="absolute right-20 top-10 text-xl text-red-600 cursor-pointer" onClick={editHandler}/>
          <FaTrash className="absolute right-10 top-10 text-xl text-red-600 cursor-pointer" onClick={deleteHandler}/>
    <p className='text-white m-10'>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione expedita culpa id molestiae minus architecto, saepe, corrupti fugiat voluptatum numquam quaerat eveniet possimus vel porro maxime ex quasi, cum explicabo?
    </p>  
  </div>
  )
}

export default AdminBlogPost