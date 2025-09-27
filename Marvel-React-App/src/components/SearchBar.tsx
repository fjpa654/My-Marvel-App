import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', textAlign: 'center' }}>
      <input
        type="text"
        placeholder="Search characters by name..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: '0.5rem 1rem',
          width: '250px',
          borderRadius: '6px',
          border: '1px solid #444',
          backgroundColor: '#1a1a1a',
          color: 'white',
          fontSize: '1rem',
        }}
      />
      <button
        type="submit"
        style={{
          marginLeft: '0.5rem',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: '1px solid #555',
          backgroundColor: '#333',
          color: '#fff',
          cursor: 'pointer',
        }}
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
