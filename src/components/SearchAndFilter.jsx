import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSelectedTags, setSearchQuery } from '../store/notesSlice'
import './SearchAndFilter.css'

const SearchAndFilter = () => {
  const dispatch = useDispatch()
  const { tags, selectedTags, searchQuery } = useSelector(state => state.notes)

  const handleTagToggle = (tag) => {
    if (selectedTags.includes(tag)) {
      dispatch(setSelectedTags(selectedTags.filter(t => t !== tag)))
    } else {
      dispatch(setSelectedTags([...selectedTags, tag]))
    }
  }

  const clearFilters = () => {
    dispatch(setSelectedTags([]))
    dispatch(setSearchQuery(''))
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
    <div className="search-filter">
      <div className="search-section">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            className="search-input"
          />
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Filter by Tags:</h3>
        <div className="tags-container">
          {tags.map(tag => (
            <button
              key={tag}
              className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
              onClick={() => handleTagToggle(tag)}
              style={{
                backgroundColor: selectedTags.includes(tag) ? getTagColor(tag) : 'transparent',
                borderColor: getTagColor(tag),
                color: selectedTags.includes(tag) ? 'white' : getTagColor(tag)
              }}
            >
              {tag}
            </button>
          ))}
        </div>
        
        {(selectedTags.length > 0 || searchQuery) && (
          <button className="clear-filters" onClick={clearFilters}>
            Clear All Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchAndFilter