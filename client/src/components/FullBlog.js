import React, { useEffect, useState } from 'react'
import '../styles/fullBlog.scss'
import { getBlog } from '../services/blog-api'

const FullBlog = ({ match: { params: { userId, blogId } } }) => {
  const [blog, setBlog] = useState({})

  useEffect(() => {
    fetchBlog()
    return
  }, [])
  
  const fetchBlog = async () => {
    const blog = await getBlog(userId, blogId)
    setBlog(blog)
  }

  const randomImgID = Math.floor(Math.random() * 1084) + 1

  const displayBlog = () => {
    return !blog.hasOwnProperty('title') ? (
      <h2>Loading...</h2>
    ) : (
      <>
        <h1 className='blog-title'>{blog.title}</h1>
        <p className='blog-bio'>{blog.created_at.substring(0, 10)} by {blog.user.username}</p>
        <div className='img-container'>
          <img className='blog-image' src={`https://i.picsum.photos/id/${randomImgID}/1200/800.jpg`} alt='' />
        </div>
        <div className='blog-content'>
          <p>{blog.text}</p>
        </div>
      </> 
    ) 
  }

  return (
    <div className='blog-container'>
      {displayBlog()}
    </div>
  )
}

export default FullBlog
