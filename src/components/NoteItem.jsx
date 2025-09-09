import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteNote, setEditingNote } from '../store/notesSlice'
import { parseMarkdown } from '../utils/markdown'
import './NoteItem.css'

const NoteItem = ({ note }) => {
  const dispatch = useDispatch()
  const [showPreview, setShowPreview] = useState(false)

  const handleEdit = () => {
    dispatch(setEditingNote(note))
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(note.id))
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getTagColor = (tag) => {
    const colors = {
      'Work': '#2563eb',
      'Personal': '#16a34a',
      'Urgent': '#dc2626',
    }
    return colors[tag] || '#6b7280'
  }

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  return (
    <div className="note-item">
      <div className="note-header">
        <h3 className="note-title">{note.title}</h3>
        <div className="note-actions">
          <button 
            onClick={() => setShowPreview(!showPreview)}
            className="preview-btn"
            title={showPreview ? 'Hide Preview' : 'Show Preview'}
          >
            {showPreview ? '👁️' : '📄'}
          </button>
          <button onClick={handleEdit} className="edit-btn" title="Edit Note">
            ✏️
          </button>
          <button onClick={handleDelete} className="delete-btn" title="Delete Note">
            🗑️
          </button>
        </div>
      </div>

      <div className="note-content">
        {showPreview && note.content ? (
          <div 
            className="note-preview"
            dangerouslySetInnerHTML={{ __html: parseMarkdown(note.content) }}
          />
        ) : (
          <p className="note-text">
            {note.content ? truncateText(note.content) : 'No content'}
          </p>
        )}
      </div>

      {note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map(tag => (
            <span 
              key={tag} 
              className="note-tag"
              style={{ 
                backgroundColor: getTagColor(tag),
                color: 'white'
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="note-footer">
        <div className="note-dates">
          <span className="note-date">
            Created: {formatDate(note.createdAt)}
          </span>
          {note.updatedAt !== note.createdAt && (
            <span className="note-date updated">
              Updated: {formatDate(note.updatedAt)}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoteItem