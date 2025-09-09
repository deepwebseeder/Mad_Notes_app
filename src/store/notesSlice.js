import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  notes: [],
  tags: ['Work', 'Personal', 'Urgent'],
  selectedTags: [],
  searchQuery: '',
  editingNote: null,
}

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action) => {
      const newNote = {
        id: Date.now().toString(),
        title: action.payload.title,
        content: action.payload.content,
        tags: action.payload.tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      state.notes.unshift(newNote)
    },
    updateNote: (state, action) => {
      const { id, title, content, tags } = action.payload
      const noteIndex = state.notes.findIndex(note => note.id === id)
      if (noteIndex !== -1) {
        state.notes[noteIndex] = {
          ...state.notes[noteIndex],
          title,
          content,
          tags,
          updatedAt: new Date().toISOString(),
        }
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter(note => note.id !== action.payload)
    },
    addTag: (state, action) => {
      if (!state.tags.includes(action.payload)) {
        state.tags.push(action.payload)
      }
    },
    setSelectedTags: (state, action) => {
      state.selectedTags = action.payload
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload
    },
    setEditingNote: (state, action) => {
      state.editingNote = action.payload
    },
    loadNotesFromStorage: (state, action) => {
      if (action.payload.notes) {
        state.notes = action.payload.notes
      }
      if (action.payload.tags) {
        state.tags = [...new Set([...state.tags, ...action.payload.tags])]
      }
    },
  },
})

export const {
  addNote,
  updateNote,
  deleteNote,
  addTag,
  setSelectedTags,
  setSearchQuery,
  setEditingNote,
  loadNotesFromStorage,
} = notesSlice.actions

export default notesSlice.reducer