import React, { useRef, useState } from 'react';
import { BsCardHeading } from "react-icons/bs";
import { MdDescription, MdContentPaste, MdImage} from "react-icons/md";
import imageCompression from "browser-image-compression";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Create() {

  const fileRef = useRef(null);

   //disable button
   const [disable, setDisable] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  
   //image compression option
   const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 720,
    useWebWorker: true
  }

  const submitHandler = async (e)=> {
    e.preventDefault();

    setDisable(true);

    const myForm = new FormData();
    myForm.set("title", title);
    myForm.set("description", description);
    myForm.set("content", content);
    myForm.set("image", image);

    const rawResponse = await fetch("/api/admin/blog/create", {
      method: "POST",
      body: myForm,
    });

    const response = await rawResponse.json();

    if(response.success){
      setTitle("");
      setDescription("");
      setContent("");
      setImage("");
      setImagePreview("");
      fileRef.current.value = "";
      return toast.success("Blog Created Successfully");
    }
    if (response.error) {
      return toast.error("Some thing went wrong");
    }

  }

  const imageHandler = async (e) => {
     
    setImage("");
    setImagePreview("");

    const file = e.target.files[0];

    const reader = new FileReader();

    if(file){
      const compressedFile = await imageCompression(file, options);
      reader.readAsDataURL(compressedFile);
    }
    
    reader.onload = () => {
        if(reader.readyState === 2) {
           setImagePreview(reader.result);
           setImage(reader.result);
        };
      };
      
         
  }

  return (
    <>
     <div className='mt-16'>
     <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          theme="dark"
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
       <div className='w-4/6 h-fit m-auto border border-red-600'>
        <form encType='multipart/form-data' onSubmit={submitHandler}>
          <h2 className='text-white text-2xl text-center m-10'>Create Blog</h2>
           <div className='flex items-center justify-center'>
              <BsCardHeading className='text-black text-2xl translate-x-8'/> 
              <input className='my-4 px-12 py-4 pr-2 w-4/5 outline-none rounded-md' 
              type="text" 
              name="title"
              value={title} 
              placeholder="Title" 
              onChange={(e)=> setTitle(e.target.value)} 
              required
              />
           </div>
           <div className='flex items-center justify-center'>
              <MdDescription className='text-black text-2xl translate-x-8'/> 
              <input className='my-4 px-12 py-4 pr-2 w-4/5 outline-none rounded-md' 
              type="text" 
              name="description"
              value={description} 
              placeholder="Description" 
              onChange={(e)=> setDescription(e.target.value)} 
              required
              />
           </div>
           <div className='flex items-center justify-center'>
              <MdContentPaste className='text-black text-2xl translate-x-8 -translate-y-24'/> 
              <textarea className='my-4 px-12 py-3 pr-2 w-4/5 h-60 outline-none rounded-md' 
              type="text"
              name="content" 
              value={content} 
              placeholder="Content" 
              onChange={(e)=> setContent(e.target.value)} 
              required
              />
           </div>
           <div className='flex items-center justify-center'>
             {image === "" ? <MdImage className='text-black text-2xl translate-x-8'/> : <img className=' translate-x-10' src={imagePreview} alt="Product Preview" width={35} height={35} /> }
              <input className='bg-white my-4 px-14 py-4 pr-2 w-4/5 outline-none rounded-md' 
              type="file" 
              name="image" 
              ref={fileRef}
              accept="image/*"  
              onChange={imageHandler}
              required
              />
           </div>
           <div className='flex items-center justify-center'>
           <button className='bg-red-600 text-white my-4 mb-10 px-12 py-4 w-4/5 rounded-md translate-x-3 hover:bg-red-400' type='submit' disabled={disable}>Create</button>
           </div>
        </form>
       </div>
     </div>
    </>
  )
}

export default Create