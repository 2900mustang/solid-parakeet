import React, { useEffect } from 'react'
import Blogs from './Blogs'

const BlogsByUser = ({ handleLoad, user, blogs, match: { params: { userId } } }) => {
  useEffect(() => {
    handleLoad(userId)
    return
  }, [userId])

  const displayBlogs = () => {
    return (
      <Blogs blogs={blogs} username={user && user.username} />
    )
  }

  return (
    <>
      {displayBlogs()}
    </>
  )
}

export default BlogsByUser
