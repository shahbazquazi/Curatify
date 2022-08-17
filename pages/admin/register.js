import React, { useEffect, useState } from "react";
import styles from "../../styles/admin/Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdEmail, MdShield, MdVpnKey } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import Router from "next/router";
import isAuthenticated from "../../components/clientSideAuth/isAuthenticated";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [adminKey, setAdminKey] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    isAuthenticated();
    
  }, [])

  const registerSubmit = async (e) => {
    e.preventDefault();

    const bloggerData = {
      name,
      email,
      password,
      adminKey,
    };

    const rawResponse = await fetch("/api/admin/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bloggerData),
    });

    const response = await rawResponse.json();

    setName("");
    setEmail("");
    setAdminKey("");
    setPassword("");

    if (response.success) {
      Router.push("/admin/home");
      return toast.success("Created Successfully");
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
          <h2>Create Blogger</h2>
          <form className={styles.loginForm} onSubmit={registerSubmit}>
            <div>
              <FaUser />
              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <MdVpnKey />
              <input
                type="password"
                value={adminKey}
                placeholder="Admin Key"
                onChange={(e) => setAdminKey(e.target.value)}
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

            <button type="submit" className={styles.loginbtn}>
              Create
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
