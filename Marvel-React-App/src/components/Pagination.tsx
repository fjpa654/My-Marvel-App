import React, { useState } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const [inputValue, setInputValue] = useState('');

  const buttons = [];
  const maxVisiblePages = 4;
  const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (startPage > 1) buttons.push(<span key="ellipsis-start">...</span>);

  for (let i = startPage; i <= endPage; i++) {
    buttons.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        disabled={i === currentPage}
        style={{
          margin: '0 4px',
          padding: '6px 12px',
          backgroundColor: i === currentPage ? '#f2f2f2' : '#222',
          color: i === currentPage ? '#111' : '#f2f2f2',
          border: '1px solid #444',
          cursor: i === currentPage ? 'default' : 'pointer',
          borderRadius: '4px',
        }}
      >
        {i}
      </button>
    );
  }

  if (endPage < totalPages) buttons.push(<span key="ellipsis-end">...</span>);

  const handleGoToPage = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(inputValue);
    if (!isNaN(num) && num >= 1 && num <= totalPages) {
      onPageChange(num);
      setInputValue('');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '8px',
      }}
    >
      {/* First button */}
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        style={{
          padding: '6px 12px',
          backgroundColor: '#333',
          color: '#fff',
          border: '1px solid #444',
          borderRadius: '4px',
          opacity: currentPage === 1 ? 0.4 : 1,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        First
      </button>

      {/* Prev */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '6px 12px',
          backgroundColor: '#333',
          color: '#fff',
          border: '1px solid #444',
          borderRadius: '4px',
          opacity: currentPage === 1 ? 0.4 : 1,
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
        }}
      >
        Prev
      </button>

      {/* Page buttons */}
      {buttons}

      {/* Next */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '6px 12px',
          backgroundColor: '#333',
          color: '#fff',
          border: '1px solid #444',
          borderRadius: '4px',
          opacity: currentPage === totalPages ? 0.4 : 1,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        Next
      </button>

      {/* Last */}
      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        style={{
          padding: '6px 12px',
          backgroundColor: '#444',
          color: '#fff',
          border: '1px solid #555',
          borderRadius: '4px',
          opacity: currentPage === totalPages ? 0.4 : 1,
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
        }}
      >
        Last
      </button>

      {/* Page X of Y */}
      <span style={{ color: '#ccc', marginLeft: '12px' }}>
        Page {currentPage} of {totalPages}
      </span>

      {/* Go to Page input */}
      <form onSubmit={handleGoToPage} style={{ marginLeft: '12px' }}>
        <input
          type="number"
          min={1}
          max={totalPages}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Go to page"
          style={{
            width: '90px',
            padding: '4px 8px',
            borderRadius: '4px',
            border: '1px solid #444',
            backgroundColor: '#1a1a1a',
            color: '#fff',
          }}
        />
      </form>
    </div>
  );
};

export default Pagination;
