import React from 'react';
import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Forgot from '../pages/Forgot';
import NotFound from '../pages/NotFound';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (token) {
    return children;
  }
  // eslint-disable-next-line react/jsx-filename-extension
  return <Navigate to="/login" />;
}

// eslint-disable-next-line react/prop-types
function PublicRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!token) {
    return children;
  }
  return <Navigate to="/" />;
}

export default function router() {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/login">
          <Route
            index
            element={(
              <PublicRoute>
                <Login />
              </PublicRoute>
            )}
          />
        </Route>
        <Route path="/register">
          <Route
            index
            element={(
              <PublicRoute>
                <Register />
              </PublicRoute>
            )}
          />
        </Route>
        <Route path="/forgot">
          <Route
            index
            element={(
              <PublicRoute>
                <Forgot />
              </PublicRoute>
            )}
          />
        </Route>
        <Route path="/">
          <Route
            index
            element={(
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            )}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
