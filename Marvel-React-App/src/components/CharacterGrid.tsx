import React from 'react';

interface CharacterGridProps {
  children: React.ReactNode;
}

const CharacterGrid: React.FC<CharacterGridProps> = ({ children }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '1.5rem',
        justifyItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default CharacterGrid;
