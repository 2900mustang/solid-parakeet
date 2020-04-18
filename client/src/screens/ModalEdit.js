import React, { useState, useEffect } from 'react'
import CloseIcon from '@material-ui/icons/Close';
import '../styles/modalEdit.scss'

const ModalEdit = ({ userId, blogId, title, text, handleSubmit, toggle, toggleModal }) => {
  const [blogForm, setBlogForm] = useState({ title: '', text: '' })

  useEffect(() => {
    setBlogForm({ title, text })
  }, [])

  const handleChange = e => {
    const { target: { name, value } } = e
    setBlogForm({ ...blogForm, [name]: value })
  }

  const update = (e) => {
    e.preventDefault()
    toggleModal()
    handleSubmit(userId, blogId, blogForm)
  }

  return (
    <div className={`modal-bg ${toggle ? 'bg-active' : ''}`}>
      <div className='modal'>
        <h2>Editing</h2>
        <form onSubmit={update}>
          <label htmlFor='name'>Title: </label>
          <input type='text' name='title' className='input-text' value={blogForm.title} onChange={handleChange} required />
          <label htmlFor='bio'>Body Text:</label>
          <textarea rows='5' placeholder='Tell me about your biking moments.' name='text' value={blogForm.text} onChange={handleChange} required></textarea>
          <CloseIcon onClick={toggleModal} className="modal-close" />
          <input className='modal-submit' type='submit' value='UPDATE' />
        </form>
      </div>
    </div>
  )
}

export default ModalEdit
