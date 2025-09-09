import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNote, updateNote, addTag, setEditingNote } from '../store/notesSlice'
import './NoteForm.css'

const NoteForm = () => {
  const dispatch = useDispatch()
  const { tags, editingNote } = useSelector(state => state.notes)
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: [],
  })
  const [newTag, setNewTag] = useState('')
  const [showTagInput, setShowTagInput] = useState(false)

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title,
        content: editingNote.content,
        tags: editingNote.tags,
      })
    }
  }, [editingNote])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) return

    if (editingNote) {
      dispatch(updateNote({ id: editingNote.id, ...formData }))
      dispatch(setEditingNote(null))
    } else {
      dispatch(addNote(formData))
    }

    setFormData({ title: '', content: '', tags: [] })
  }

  const handleTagToggle = (tag) => {
    if (formData.tags.includes(tag)) {
      setFormData({
        ...formData,
        tags: formData.tags.filter(t => t !== tag)
      })
    } else {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag]
      })
    }
  }

  const handleNewTag = (e) => {
    e.preventDefault()
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const trimmedTag = newTag.trim()
      dispatch(addTag(trimmedTag))
      setFormData({
        ...formData,
        tags: [...formData.tags, trimmedTag]
      })
    }
    setNewTag('')
    setShowTagInput(false)
  }

  const cancelEdit = () => {
    dispatch(setEditingNote(null))
    setFormData({ title: '', content: '', tags: [] })
  }

  const getTagColor = (tag) => {
    const colors = {
      'Work': '#2563eb',
      'Personal': '#16a34a',
      'Urgent': '#dc2626',
    }
    return colors[tag] || '#6b7280'
  }

  return (
    <div className="note-form-container">
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-header">
          <h2>{editingNote ? 'Edit Note' : 'Create New Note'}</h2>
          {editingNote && (
            <button type="button" onClick={cancelEdit} className="cancel-btn">
              Cancel
            </button>
          )}
        </div>

        <input
          type="text"
          placeholder="Note title..."
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="title-input"
          required
        />

        <textarea
          placeholder="Write your note here... (Supports basic markdown: # ## ### **bold** *italic* `code`)"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="content-input"
          rows="6"
        />

        <div className="tags-section">
          <h3>Tags:</h3>
          <div className="available-tags">
            {tags.map(tag => (
              <button
                key={tag}
                type="button"
                className={`tag-btn ${formData.tags.includes(tag) ? 'selected' : ''}`}
                onClick={() => handleTagToggle(tag)}
                style={{
                  backgroundColor: formData.tags.includes(tag) ? getTagColor(tag) : 'transparent',
                  borderColor: getTagColor(tag),
                  color: formData.tags.includes(tag) ? 'white' : getTagColor(tag)
                }}
              >
                {tag}
              </button>
            ))}
            
            {!showTagInput ? (
              <button
                type="button"
                onClick={() => setShowTagInput(true)}
                className="add-tag-btn"
              >
                + Add Tag
              </button>
            ) : (
              <form onSubmit={handleNewTag} className="new-tag-form">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="New tag..."
                  className="new-tag-input"
                  autoFocus
                />
                <button type="submit" className="save-tag-btn">✓</button>
                <button 
                  type="button" 
                  onClick={() => { setShowTagInput(false); setNewTag('') }}
                  className="cancel-tag-btn"
                >
                  ✕
                </button>
              </form>
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          {editingNote ? 'Update Note' : 'Create Note'}
        </button>
      </form>
    </div>
  )
}

export default NoteForm