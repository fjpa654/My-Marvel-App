import React, { useState } from 'react';
import CharacterCard from './components/CharacterCard';
import CharacterGrid from './components/CharacterGrid';
import Pagination from './components/Pagination';
import Loader from './components/Loader';
import EmptyState from './components/EmptyState';
import SearchBar from './components/SearchBar';
import { useFetchCharacters } from './hooks/useFetchCharacters';

const ITEMS_PER_PAGE = 10;

function App() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const {
    characters,
    totalPages,
    loading,
    error,
  } = useFetchCharacters(page, ITEMS_PER_PAGE, searchTerm);

  const handleSearch = (query: string) => {
    setSearchTerm(query);
    setPage(1); // Reset to first page on new search
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1
        style={{
          color: 'white',
          marginBottom: '2rem',
          textAlign: 'center',
        }}
      >
        Marvel Characters
      </h1>

      <SearchBar onSearch={handleSearch} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      {loading ? (
        <Loader />
      ) : error ? (
        <p style={{ color: 'red', textAlign: 'center' }}>
          Failed to load characters. Please try again.
        </p>
      ) : characters.length === 0 ? (
        <EmptyState message="No characters with comics found." />
      ) : (
        <CharacterGrid>
          {characters.map((char, idx) => (
            <CharacterCard
              key={idx}
              name={char.name}
              comicThumbs={char.comicThumbs}
            />
          ))}
        </CharacterGrid>
      )}
    </div>
  );
}

export default App;
