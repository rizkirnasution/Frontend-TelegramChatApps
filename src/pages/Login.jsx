import '../assets/styles/auth.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/auth';
import { createToast } from '../utils/createToast';

export default function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Login`;
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setErrors([{ msg: 'All field required must be filled' }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const loginStatus = await login(form, setErrors);
      if (loginStatus) {
        createToast('Login Success', 'success');
        navigate('/');
      }

      setIsLoading(false);
    }
  };

  const inputChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div className="container">
      <div className="auth mx-auto">
        <h3 className="color-blue text-center mb-4">Login</h3>
        <p>Hi, welcome back!</p>
        {errors.length > 0 && (
          <div className="alert alert-danger mx-0 py-2">
            <ul className="m-0">
              {errors.map((error, index) => (
                <li key={index}>{error.msg}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label text-secondary">
              <small>Email</small>
            </label>
            <input
              type="email"
              className="form-control input-auth"
              id="email"
              placeholder="Enter your email address"
              onChange={inputChangeHandler}
              value={form.email}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-secondary">
              <small>Password</small>
            </label>
            <input
              type="password"
              className="form-control input-auth"
              id="password"
              placeholder="Enter your password"
              onChange={inputChangeHandler}
              value={form.password}
            />
          </div>
          <div className="d-flex justify-content-end mb-4">
            <Link to="/forgot">Forgot Password</Link>
          </div>
          {isLoading ? (
            <button
              className="btn bg-blue w-100 text-white p-3 rounded-pill"
              disabled
              type="button"
            >
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              {' '}
              Loading...
            </button>
          ) : (
            <button
              type="submit"
              className="btn bg-blue w-100 text-white p-3 rounded-pill"
            >
              Login
            </button>
          )}
        </form>
        <div className="row title-bottom">
          <div className="col-4">
            <div className="line" />
          </div>
          <div
            className="col-4 text-secondary text-center"
            style={{ marginTop: '-10px' }}
          >
            Login With
          </div>
          <div className="col-4">
            <div className="line" />
          </div>
        </div>
        <button type="button" className="btn w-100 btn-google p-3 rounded-pill">
          Google
        </button>
        <p className="text-center mt-4">
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
