import React from 'react';

export default function Loading() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="spinner-border green-text" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
}
