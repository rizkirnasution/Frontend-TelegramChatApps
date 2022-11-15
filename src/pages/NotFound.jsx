import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container vw-100 vh-100 d-flex flex-column justify-content-center align-items-center">
      <h1 className="fw-bold">404 Page Not Found</h1>
      <Link className="text-decoration-none mt-2" to="/">Back To Landing Page</Link>
    </div>
  );
}
