import React, { useEffect } from 'react'
import Blogs from './Blogs'

const BlogsByUser = ({ handleLoad, user, blogs, updateBlog, deleteBlog, currentUser, match: { params: { userId } } }) => {
  useEffect(() => {
    handleLoad(userId)
    return
  }, [userId])

  const displayBlogs = () => {
    return (
      <Blogs blogs={blogs} username={user && user.username} updateBlog={updateBlog} deleteBlog={deleteBlog} currentUser={currentUser} />
    )
  }

  return (
    <>
      {displayBlogs()}
    </>
  )
}

export default BlogsByUser
