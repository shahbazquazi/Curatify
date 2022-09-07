import React, { useState } from "react";
import { FaFacebook, FaWhatsapp, FaInstagram, FaTwitter } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

   const contactForm = {
     name,
     email,
     message
   }
    const rawResponse = await fetch(`/api/user/contact/form`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(contactForm),
    });

    const response = await rawResponse.json();

    if(response.success){
      // setName("");
      // setEmail("");
      // setMessage("");
      return toast.success("Email Sent Successfully");
    }
    if (response.error) {
      return toast.error("Some thing went wrong");
    }
  };
  return (
    <>
      <div className="w-screen flex">
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
        <div className="text-white w-1/2 h-screen mt-24">
          <div>
            <form onSubmit={submitHandler} className="flex flex-col">
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Enter your Name"
                  onChange={(e) => setName(e.target.value)}
                  className="p-2 w-3/4 m-4 text-white bg-black border border-red-600"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2 w-3/4 text-white bg-black border border-red-600"
                  autoComplete="off"
                  required
                />
              </div>
              <div className="flex items-center justify-center">
                <textarea
                  name="message"
                  placeholder="Enter your Message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="p-2 m-4 w-3/4 text-white bg-black border border-red-600"
                  cols="30"
                  rows="10"
                  required
                ></textarea>
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="p-2 w-3/4 text-white bg-red-600 hover:text-black"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-white w-1/2 h-screen mt-24">
          <div className="m-5">
            <h1 className="text-red-600 text-5xl">Contact Us</h1>
            <p className="mt-10">We would love to hear from you!</p>
            <p className="mt-4">
              Our team will make sure that we get back to you soon and answer
              all of your queries. Thank you for getting in touch with us! 
            </p>
          
          <div className="flex">
          <div className="flex justify-center items-center mt-16">
              <FaFacebook className="m-2 hover:text-red-600" />
              <FaWhatsapp className="m-2 hover:text-red-600" />
              <FaInstagram className="m-2 hover:text-red-600" />
              <FaTwitter className="m-2 hover:text-red-600" />
            </div>
            </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
