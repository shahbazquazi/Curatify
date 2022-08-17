import React, { useEffect, useState } from "react";
import styles from "../../styles/admin/Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail, MdShield } from "react-icons/md";
import Link from 'next/link';
import Router from "next/router";
import isAuthenticated from "../../components/clientSideAuth/isAuthenticated";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    isAuthenticated();
    
  }, [])
  
  const loginSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    const rawResponse = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const response = await rawResponse.json();

    setEmail("");
    setPassword("");

    if(response.success){
      Router.push("/admin/home");
      return toast.success("loggedIn Successfully");
    }
    if (response.error) {
      return toast.error("Some thing went wrong");
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
          <h2>Blogger Login</h2>
          <form className={styles.loginForm} onSubmit={loginSubmit}>
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
            <div>
              <MdShield />
              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className={styles.loginbtn}
            >
              Login
            </button>

              <div className={styles.linkDiv}>
            <Link href="/admin/password/forgot">
          <a  className={styles.forgetLink}>Forgot Password</a>
        </Link>
        <Link href="/admin/register">
          <a className={styles.createLink}>Create Account</a>
        </Link>
        </div> 
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
