import React from 'react';
import {useRouter} from 'next/router';
import AdminBlogPost from '../../../components/admin/AdminBlogPost';

function slug() {
  
    const router = useRouter();
    const {slug} = router.query;
  return (
    <>
    <AdminBlogPost/>
    </>
  )
}

export default slug