import React from "react";
import styles from "../../styles/blog/Blog.module.css";
import Link from "next/link";

function Blog() {
  return (
    <>
      <Link href="/blogpost/[slug].js">
        <a className={styles.homeBlogsContainer}>
          <h3 className={styles.title}>Title</h3>
          <p className={styles.description}>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis, sit. Praesentium accusantium ea aperiam, commodi quasi cupiditate sed eaque, asperiores eius id dolore eos ex suscipit, laborum impedit officiis dicta.
          </p>
        </a>
      </Link>
    </>
  );
}

export default Blog;
