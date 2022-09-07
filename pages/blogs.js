import React, { useEffect, useState } from "react";
import Blog from "../components/blog/Blog";
import styles from "../styles/blog/Blog.module.css";
import InfiniteScroll from "react-infinite-scroll-component";

function blogs({data}) {
  const [page, setPage] = useState(1);
  const [blogs, setBlogs] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getMoreBlogs = async () => {
    
    const rawResponse = await fetch(`/api/user/allblogs/${page}`, {
      method: "GET",
    });
    
    const response = await rawResponse.json();
    
    if (response.success) {
      setPage(page + 1);
      const newBlogs = response.blogs;
      setBlogs([...blogs, ...newBlogs]);
    }
  };
  
  useEffect(() => {
   setHasMore(data.length > blogs.length ? true : false);
  }, [blogs])

  return (
    <>
      <img className="absolute top-0 w-screen opacity-30" src="/blogBg.jpg" />
      <div className={styles.container}>
        <h2 className={styles.heading}>Blogs</h2>
        <div className={styles.BlogList}>
          <InfiniteScroll
            dataLength={blogs.length} // datalength is length of item already displayed on page
            next={getMoreBlogs}
            hasMore={hasMore}
            loader={<h3> Loading...</h3>}
            endMessage={<h4>Nothing more to show</h4>}
          >
            <Blog blogs={blogs} />
          </InfiniteScroll>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const protocol =
  context.req.headers["x-forwarded-proto"] || context.req.connection.encrypted
    ? "https"
    : "http";
  const host = context.req.headers.host;

  const rawResponse = await fetch(
    `${protocol}://${host}/api/user/getblogs`,
    {
      method: "GET",
    }
  );

  const response = await rawResponse.json();


  const data = response.blogs;

  return { props: { data } };
}

export default blogs;
