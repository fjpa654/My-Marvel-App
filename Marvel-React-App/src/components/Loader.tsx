import React from 'react';
import './Loader.css'; // 👈 We’ll create this next

const Loader: React.FC = () => {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <div className="spinner" />
    </div>
  );
};

export default Loader;
