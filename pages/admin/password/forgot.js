import React, { useState } from "react";
import styles from "../../../styles/admin/Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail } from "react-icons/md";
import Router from "next/router";


function Forgot() {
  const [email, setEmail] = useState("");

  const forgotSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
    };

    const rawResponse = await fetch("/api/admin/password/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const response = await rawResponse.json();

    setEmail("");

    if(response.success){
      Router.push("/");
      return toast.success("Email sent Successfully");
    }
    if (response.error) {
      return toast.error("Something went wrong");
    }
  };


  return (
    <>
      <div className={styles.loginContainer}>
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
        <div className={styles.loginBox}>
          <h2>Forgot Password</h2>
          <form className={styles.loginForm} onSubmit={forgotSubmit}>
            <div>
              <MdEmail />
              <input
                type="email"
                value={email}
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
         
            <button
              type="submit"
              className={styles.loginbtn}
            >
              Send
            </button>

            
          </form>
        </div>
      </div>
    </>
  );
}

export default Forgot;
