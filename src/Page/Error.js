import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div>
      <h1>not found</h1>
      <div>
        <Link to="/">list</Link>
      </div>
    </div>
  );
};

export default Error;
