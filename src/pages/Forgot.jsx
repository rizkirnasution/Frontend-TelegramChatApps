import '../assets/styles/auth.css';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { forgot } from '../redux/actions/auth';
import { createToast } from '../utils/createToast';

export default function Forgot() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    email: '',
  });

  useEffect(() => {
    document.title = `${process.env.REACT_APP_APP_NAME} - Forgot Password`;
    window.scrollTo(0, 0);
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!form.email) {
      setErrors([{ msg: 'All field required (*) must be filled' }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const forgotStatus = await forgot(form, setErrors);
      if (forgotStatus) {
        createToast('Send Reset Password Email Success', 'success');
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
      <div className="auth mx-auto pb-5">
        <h3 className="color-blue text-center mb-4 position-relative">
          <Link to="/">
            <div className="back-icon color-blue">
              <h3>
                <IoIosArrowBack />
              </h3>
            </div>
          </Link>
          Forgot Password
        </h3>
        <p>You’ll get messages soon on your e-mail </p>
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
          <div className="mb-4 mt-4">
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
            Reset Password
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
