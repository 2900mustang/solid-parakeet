import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import '../styles/blog.scss'

const Blog = ({ userId, blogId, title, text, date, author, comments, history }) => {  
  // const { commenter, body } = comments
  const sentence = text.split(' ').slice(0, 21).join(' ')
  const createdDate = date.substring(0, 10)
  const randomImgID = Math.floor(Math.random() * 1084) + 1
  
  return (
    <>
      <div className='card-link'>
        <article className="blog-card">
          <img src={`https://i.picsum.photos/id/${randomImgID}/1200/800.jpg`} alt="" className="blog-image" />
          <div className="article-details">
            <Link to={`/users/${userId}/blogs/${blogId}`}>
              <h3 className="blog-title">{title}</h3>
            </Link>
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
      </div>
    </>
  )
}

export default withRouter(Blog)
