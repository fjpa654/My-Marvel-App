import React from 'react';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'Nothing to display.',
}) => {
  return (
    <div
      style={{
        textAlign: 'center',
        color: '#999',
        padding: '2rem',
        fontSize: '1.2rem',
      }}
    >
      {message}
    </div>
  );
};

export default EmptyState;
