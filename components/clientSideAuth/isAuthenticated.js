import Router from "next/router";

const isAuthenticated = async () => {

  const rawResponse = await fetch("/api/admin/blogger/details", {
    method: "GET",
  });

  const response = await rawResponse.json();
  
  if(response.success){
   return Router.push("/admin/home");
  }
};

export default isAuthenticated;
