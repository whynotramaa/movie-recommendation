import React, { useRef, forwardRef, useImperativeHandle } from 'react'

const Search = forwardRef(({ search, setSearchTerm }, ref) => {
  const inputRef = useRef(null);

  // Expose focus method to parent component
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    }
  }));

  return (
    <div className="search">
      <div>
        <img src="/search.svg" alt="search" />

        <input
          ref={inputRef}
          type="text"
          placeholder="Search through thousands of movies (Press '/' to focus)"
          value={search}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
        {search && (
          <button
            onClick={() => setSearchTerm("")}
            className="clear-button"
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#666',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ×
          </button>
        )}
      </div>

    </div>
  )
});

Search.displayName = "Search";

export default Search