import React, { useEffect, useState } from 'react'
import '../styles/fullBlog.scss'
import '../styles/comment.scss' 
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { getBlog, createComment, updateComment, destroyComment } from '../services/blog-api'

const FullBlog = ({ currentUser, match: { params: { userId, blogId } } }) => {
  const [blog, setBlog] = useState({})
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState({ commenter: null, body: '', blog_id: blogId, user_id: userId })
  const [currentCommentId, setCurrentCommentId] = useState(null)

  useEffect(() => {
    if (currentUser) {
      setComment({ ...comment, commenter: currentUser.username })
    }
    fetchBlog()
    return
  }, [currentUser])
  
  const fetchBlog = async () => {
    const blog = await getBlog(userId, blogId)
    setBlog(blog)
    setComments(blog.comments)
  }

  const handleChange = e => {
    const { target: { name, value } } = e
    setComment({ ...comment, [name]: value })
  }

  const postComment = async (e) => {
    e.preventDefault()
    try {
      const createdComment = await createComment(blogId, comment)
      if (createdComment) {
        setComments(comments.concat(createdComment))
        setComment({ ...comment, body: '' })
      } 
    } catch (e) {
      console.error(e.message)
    }
  }
  
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const updatedComment = await updateComment(blogId, currentCommentId, comment)
      if (updatedComment) {
        setComments(comments.map(comment => comment.id.toString() !== currentCommentId.toString() ? comment : updatedComment))
        setComment({ ...comment, body: '' })
        setCurrentCommentId(null)
      }
    } catch (e) {
      console.error(e.message)
    }
  }

  const handleDelete = async (commentId) => {
    try {
      await destroyComment(blogId, commentId)
      setComments(comments.filter(comment => comment.id !== commentId))
    } catch (e) {
      console.error(e.message)
    }
  }

  const displayBlog = () => {
    const randomImgID = Math.floor(Math.random() * 1084) + 1

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

  const displayComments = () => {
    return comments.map(comment => {
      const randomImgId = Math.floor(Math.random() * 70) + 1
      const { id, commenter, body, created_at } = comment

      return (
        <div className='comment' key={id}>
          <img src={`https://i.pravatar.cc/300?img=${randomImgId}`} className='commentPic' alt='' />
          <div>
            <div className='commentHeader'>
              <div className='commenter'>{commenter}</div>
              <div className='comment-date'>{created_at.substring(0, 10)}</div>
            {
              (currentUser && currentUser.username) === commenter &&
              <div className='buttons-box'>
                <EditIcon className='edit-button' onClick={() => { setComment({...comment, body}); setCurrentCommentId(id)} } />
                <DeleteIcon className='delete-button' onClick={() => handleDelete(id)} />
              </div> 
            }
            </div>
            <span>{body}</span>
          </div>
        </div>
      )
    })
  }

  return (
    <div className='blog-container'>
      {displayBlog()}
      <div className='comments-box'>
        <div className='form-container'>
          <form className='comment-form'>
            <label htmlFor="comment">Your Comment</label>
            <textarea 
              className='text-area'
              id="comment"
              type="text" 
              placeholder="Comment"
              name='body'
              value={comment.body}
              onChange={handleChange}
              required/>
            { !currentCommentId && <button className='comment-btn' onClick={postComment}>Post</button> }
            { currentCommentId && <div className='buttons-box'>
              <button className='comment-btn' onClick={handleUpdate} >Update</button> 
              <button className='comment-btn' onClick={() => { setComment({...comment, body: ''}); setCurrentCommentId(null)} }>Cancel</button> 
            </div> }
          </form>        
        </div>
        {displayComments()}
      </div>
    </div>
  )
}

export default FullBlog
