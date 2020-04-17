import React, { useEffect } from 'react'
import Blogs from './Blogs'

const BlogsByUser = ({ handleLoad, owner, blogs, updateBlog, deleteBlog, currentUser, match: { params: { userId } } }) => {
  useEffect(() => {
    handleLoad(userId)
    return
  }, [userId])

  const displayBlogs = () => {
    return (
      <Blogs blogs={blogs} owner={owner} updateBlog={updateBlog} deleteBlog={deleteBlog} currentUser={currentUser} />
    )
  }

  return (
    <>
      {displayBlogs()}
    </>
  )
}

export default BlogsByUser
