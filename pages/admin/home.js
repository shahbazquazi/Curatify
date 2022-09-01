import React, { useEffect, useState } from "react";
import styles from "../../styles/blog/Blog.module.css";
import { BsFillPlusCircleFill } from "react-icons/bs";
import Router from "next/router";
import AdminBlog from "../../components/admin/AdminBlog";
import { ToastContainer, toast } from "react-toastify";

function Home() {
  const [bloggerName, setBloggerName] = useState("");

  const logoutHandle = async () => {
    const rawResponse = await fetch("/api/admin/logout", {
      method: "GET",
    });

    const response = await rawResponse.json();

    if (response.success) {
      Router.push("/admin/login");
      return toast.success("logout Successfully");
    }

    if (response.error) {
      return toast.error("Some thing went wrong");
    }
  };

  useEffect(() => {
    const data = async () => {
      const rawResponse = await fetch("/api/admin/blogger/details", {
        method: "GET",
      });
      const response = await rawResponse.json();

      if (response.success) {
        setBloggerName(response.blogger.name);
      }
      if (response.error) {
        Router.push("/admin/login");
      }
    };
    data();
  }, []);

  const createBlogHandler = () => {
    Router.push("/admin/blog/create");
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
      <div className={styles.container}>
        <div className="ml-5 mb-3">
          Welcome <span className="text-red-600">{bloggerName}</span>
          <span
            className="absolute right-3 p-1 text-red-600 hover:text-black cursor-pointer bg-white rounded-lg"
            onClick={logoutHandle}
          >
            Logout
          </span>
        </div>
        <div className="relative m-5">
          <BsFillPlusCircleFill
            className="text-4xl absolute right-0 top-2 hover:text-red-600
        peer"
            onClick={createBlogHandler}
          />
          <span className="absolute right-0 top-11 translate-x-5 invisible peer-hover:visible peer-hover:text-red-600">
            Create Blog
          </span>
          <h2 className={styles.heading}>My Blogs</h2>
          <div className={styles.BlogList}>
            <AdminBlog />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
