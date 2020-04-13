import React from 'react'
import '../styles/blogForm.scss'

const BlogForm = ({ blogForm, handleChange, handleSubmit }) => {
  const { title, text } = blogForm

  return (
    <div className='blogForm-container'>
       <form className='blog-form' onSubmit={handleSubmit}>
         <fieldset>
          <p className='form-statement'>Trust me, nobody is reading your blog.</p>
          <label className='labels' htmlFor='title'>Title</label>
          <input className='input-text' type='text' placeholder='500 Error' name='title' value={title} onChange={handleChange} required />
          <label className='labels' htmlFor='bio'>Body Text</label>
          <textarea rows='12' placeholder='Tell me about your cheesy moments.' name='text' value={text} onChange={handleChange} required></textarea>
         </fieldset>
         <input className='input-submit' type='submit' value='Submit Blog' />
       </form>
    </div>
  )
}

export default BlogForm
