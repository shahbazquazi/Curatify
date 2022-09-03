import React from "react";

function title(props) {
  const blog = props.response.blog[0];


  return (
    <>
    
      <div className="relative w-4/5 mt-28 mb-10 m-auto border border-red-600">
        <h1 className="text-white text-center text-2xl m-10 mt-24 mb-8 pb-5">
          {blog.title}
        </h1>
       
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

  const rawResponse = await fetch(
    `${protocol}://${host}/api/user/fetch/${title}`,
    {
      method: "GET",
    }
  );

  const response = await rawResponse.json();

  return { props: { response } };
}

export default title;
