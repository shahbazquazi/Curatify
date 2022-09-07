import React, { useState } from 'react';
import {useRouter} from 'next/router';
import styles from "../../../../styles/admin/Login.module.css";
import { ToastContainer, toast } from "react-toastify";
import { MdShield } from "react-icons/md";
import Router from "next/router";


function ResetToken() {

    const router = useRouter();
    const token = router.query.resetToken;
 
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const resetSubmit = async (e) => {
      e.preventDefault();
  
      const resetData = {
        password,
        confirmPassword
      };
  
      const rawResponse = await fetch(`/api/admin/password/reset/${token}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resetData),
      });
  
      const response = await rawResponse.json();
  
      setPassword("");
      setConfirmPassword("");
  
      if(response.success){
        Router.push("/admin/login");
        return toast.success("Password Reset Successfully");
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
          <h2>Reset Password</h2>
          <form className={styles.loginForm} onSubmit={resetSubmit}>
            
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

            <div>
              <MdShield />
              <input
                type="password"
                value={confirmPassword}
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            
            <button
              type="submit"
              className={styles.loginbtn}
            >
              Reset
            </button>

             
          </form>
        </div>
      </div>
    </>
  )
}

export default ResetToken