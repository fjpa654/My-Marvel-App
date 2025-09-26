import React from 'react';

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

  return (
    <div
    style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center', // ✅ centers horizontally
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
    gap: '6px',
    }}
    >

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          marginRight: '8px',
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

      {buttons}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          marginLeft: '8px',
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

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        style={{
          marginLeft: '8px',
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
    </div>
  );
};

export default Pagination;
