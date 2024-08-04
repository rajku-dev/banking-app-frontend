import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center my-5">
      <div className="d-flex flex-column align-items-center">
        <h1 className="display-4 text-secondary">404 - Not Found</h1>
        <p className="lead">The page you are looking for does not exist.</p>
        <Link to="/" className="btn btn-secondary mt-4">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default NotFound;
