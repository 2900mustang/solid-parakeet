import React, { useState } from 'react'
import { withRouter, Link } from 'react-router-dom'
import '../styles/blog.scss'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ModalEdit from '../screens/ModalEdit'

const Blog = ({ userId, blogId, title, text, date, author, currentUser, comments, deleteBlog, updateBlog }) => {  
  const [toggle, setToggle] = useState(false)
  const sentence = text.split(' ').slice(0, 21).join(' ')
  const createdDate = date.substring(0, 10)
  const randomImgID = Math.floor(Math.random() * 1084) + 1
  
  const toggleModal = () => setToggle(!toggle)

  return (
    <>
      <div className='card-container'>
        <article className="blog-card">
          <img src={`https://i.picsum.photos/id/${randomImgID}/1200/800.jpg`} alt="" className="blog-image" />
          <div className="article-details">
            <div className='title-flex'>
              <Link to={`/users/${userId}/blogs/${blogId}`}>
                <h3 className="blog-title">{title}</h3>
              </Link>
              {
                currentUser.username === author &&
                  <div className='buttons-box'>
                    <EditIcon className='edit-button' onClick={toggleModal} />
                    <DeleteIcon className='delete-button' onClick={() => deleteBlog(`${userId}`, `${blogId}`)} />
                  </div> 
              }
            </div>
            <p className="blog-description">{sentence}...</p>
            <div className='bottom-border'>
              <Link to={`/users/${userId}/blogs`}>
                <p className="blog-author">{author}</p>
              </Link>
              <p className="blog-comment-count">{comments ? comments.length : 0} comments</p>
              <p className="blog-date">{createdDate}</p>
            </div>
          </div>
        </article>      
        <ModalEdit title={title} text={text} handleSubmit={updateBlog} toggle={toggle} toggleModal={toggleModal} userId={userId} blogId={blogId} />
      </div>
    </>
  )
}

export default withRouter(Blog)
