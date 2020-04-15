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

  const update = () => {
    toggleModal()
    handleSubmit(userId, blogId, blogForm)
  }

  return (
    <div className={`modal-bg ${toggle ? 'bg-active' : ''}`}>
      <div className='modal'>
        <h2>Edit Me</h2>
        <label htmlFor='name'>Title: </label>
        <input type='text' name='title' className='input-text' value={blogForm.title} onChange={handleChange} />
        <label className='labels' htmlFor='bio'>Body Text</label>
        <textarea className='text-area' rows='5' placeholder='Tell me about your cheesy moments.' name='text' value={blogForm.text} onChange={handleChange}></textarea>
        <CloseIcon onClick={toggleModal} className="modal-close" />
        <button onClick={update}>Update</button>
      </div>
    </div>
  )
}

export default ModalEdit
