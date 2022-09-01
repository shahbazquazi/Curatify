import React from "react";
import Router from "next/router";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function title(props) {
  const blog = props.response.blog[0];

  const editHandler = () => {
    Router.push(`/admin/blog/update/${blog._id}`);
  };

  const deleteHandler = async () => {
    const rawResponse = await fetch(`/api/admin/blog/delete/${blog._id}`,{
      method: "DELETE"
    });
    const response = await rawResponse.json();

    if (response.success) {
      Router.push(`/admin/home`);
      return toast.success("Deleted Successfully");
    }
  };

  return (
    <>
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
        <img
          className="w-4/5 h-96 m-auto"
          src={blog.image[0].url}
          alt="No image found"
        />
        <p className="text-white mx-28 my-10">{blog.content}</p>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  
  const { title } = context.query;
  const protocol =
  context.req.headers["x-forwarded-proto"] || context.req.connection.encrypted
    ? "https"
    : "http";
  const host = context.req.headers.host;
  const cookie = context.req.headers.cookie;

  const rawResponse = await fetch(
    `${protocol}://${host}/api/admin/blog/fetch/${title}`,
    {
      method: "GET",
      headers: {
        cookie,
      },
    }
  );

  const response = await rawResponse.json();

  return { props: { response } };
}

export default title;
