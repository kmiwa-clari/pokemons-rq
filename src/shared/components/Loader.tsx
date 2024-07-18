import './Loader.css';
import React from 'react';

function Loader() {
  return (
    <div data-testid="loader-container" className="loader-container">
      <div className="loader"></div>
    </div>
  )
}

export default Loader;