import React from 'react';
import { FaEdit, FaTrash } from "react-icons/fa";


function title(props) {
  
  const blog = props.response.blog[0];

  const editHandler = () => {
    console.log("edit");
  };

  const deleteHandler = () => {
    console.log("delete");
  };
  return (
    <div className="relative w-4/5 mt-28 mb-10 m-auto border border-red-600">
      <h1 className="text-white text-center text-2xl m-10 mt-24 mb-8 pb-5">
        {blog.title}
      </h1>
      <FaEdit
        className="absolute right-20 top-10 text-xl text-red-600 cursor-pointer"
        onClick={editHandler}
      />
      <FaTrash
        className="absolute right-10 top-10 text-xl text-red-600 cursor-pointer"
        onClick={deleteHandler}
      />
      <img className="w-4/5 h-96 m-auto" src={blog.image[0].url} alt="No image found" />
      <p className="text-white mx-28 my-10">
       {blog.content}
      </p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const {title} = context.query;
  const protocol = context.req.headers.referer.split('://')[0];
  const host = context.req.headers.host;
  const cookie = context.req.headers.cookie;

  const rawResponse = await fetch(`${protocol}://${host}/api/admin/blog/fetch/${title}`, {
    method: "GET",
    headers: {
      cookie
    }
  });

  const response = await rawResponse.json();

  return { props: { response } }
}

export default title