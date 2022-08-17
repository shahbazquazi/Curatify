import React from 'react';
import {useRouter} from 'next/router';
import BlogPost from '../../components/blog/BlogPost';

function slug() {
  
    const router = useRouter();
    const {slug} = router.query;
  return (
    <>
    <BlogPost/>
    </>
  )
}

export default slug