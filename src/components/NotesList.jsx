import React from 'react'
import { useSelector } from 'react-redux'
import NoteItem from './NoteItem'
import './NotesList.css'

const NotesList = () => {
  const { notes, selectedTags, searchQuery } = useSelector(state => state.notes)

  const filteredNotes = notes.filter(note => {
    const matchesSearch = !searchQuery || 
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => note.tags.includes(tag))

    return matchesSearch && matchesTags
  })

  if (filteredNotes.length === 0) {
    return (
      <div className="notes-list">
        <div className="empty-state">
          {notes.length === 0 ? (
            <>
              <div className="empty-icon">📝</div>
              <h3>No notes yet</h3>
              <p>Create your first note to get started!</p>
            </>
          ) : (
            <>
              <div className="empty-icon">🔍</div>
              <h3>No matching notes</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="notes-list">
      <div className="notes-header">
        <h2>
          {filteredNotes.length === notes.length 
            ? `All Notes (${notes.length})` 
            : `Filtered Notes (${filteredNotes.length} of ${notes.length})`
          }
        </h2>
      </div>
      <div className="notes-grid">
        {filteredNotes.map(note => (
          <NoteItem key={note.id} note={note} />
        ))}
      </div>
    </div>
  )
}

export default NotesList