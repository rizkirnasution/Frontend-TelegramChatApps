import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import { FaRegEdit } from 'react-icons/fa';
import { editProfile, editPhoto, getDetailUser } from '../redux/actions/user';
import { createToast } from '../utils/createToast';
import PhotoDefault from '../assets/photo_default.jpg';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { detailUser } = useSelector((state) => state);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: detailUser.data.username ? detailUser.data.username : '',
    phone: detailUser.data.phone ? detailUser.data.phone : '',
    bio: detailUser.data.bio ? detailUser.data.bio : '',
  });
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem('id');
    dispatch(getDetailUser(id, navigate));
  }, []);

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const photoChangeHandler = (e) => {
    setPhoto(e.target.files[0]);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!form.username) {
      setErrors([{ msg: 'All field required (*) must be filled' }]);
    } else {
      setErrors([]);
      setIsLoading(true);

      const editProfileStatus = await editProfile(form, setErrors);
      if (editProfileStatus) {
        createToast('Edit Profile Success', 'success');
        const id = localStorage.getItem('id');
        dispatch(getDetailUser(id, navigate));
      }

      setIsLoading(false);
    }
  };

  const onSubmitPhoto = async () => {
    document.getElementById('close').click();

    const formData = new FormData();
    if (photo) {
      formData.append('photo', photo);
    }

    setErrors([]);
    setPhotoIsLoading(true);

    const editPhotoStatus = await editPhoto(formData, setErrors);
    if (editPhotoStatus) {
      createToast('Edit Photo Success', 'success');
      const id = localStorage.getItem('id');
      dispatch(getDetailUser(id, navigate, setPhotoIsLoading));
      setPhoto(null);
    }
  };

  return (
    <div className="left-menu col-4 col-md-3 p-4">
      <Link to="/">
        <div className="color-blue">
          <h3>
            <IoIosArrowBack />
          </h3>
        </div>
      </Link>
      <div className="profile mt-4 profile">
        <div className="position-relative">
          {
            photoIsLoading ? (
              <div className="p-3">
                <div className="spinner-grow" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )
              : (
                <>
                  {detailUser.data.photo ? (
                    <img
                      className="profile-rounded"
                      src={`https://drive.google.com/uc?export=view&id=${detailUser.data.photo}`}
                      alt="Gambar Profile"
                    />
                  ) : (
                    <img
                      className="profile-rounded"
                      src={PhotoDefault}
                      alt="Gambar Profile"
                    />
                  )}
                </>
              )
          }
          <div
            className="edit-icon position-absolute"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#editPhoto"
          >
            <FaRegEdit />
          </div>
        </div>

        <div
          className="modal fade"
          id="editPhoto"
          tabIndex="-1"
          aria-labelledby="editPhotoLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editPhotoLabel">
                  Change Photo Profile
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <form>
                  <input
                    type="file"
                    className="form-control"
                    onChange={photoChangeHandler}
                  />
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  id="close"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={onSubmitPhoto}
                  className="btn bg-blue text-white"
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <h5 className="fw-bold mt-3">{detailUser.data.username}</h5>
      </div>
      <br />
      {errors.length > 0 && (
        <div className="alert alert-danger mx-0 py-2">
          <ul className="m-0">
            {errors.map((error, index) => (
              <li key={index}>{error.msg}</li>
            ))}
          </ul>
        </div>
      )}
      <form onSubmit={onSubmitHandler}>
        <div className="mb-4">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={form.username}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            readOnly
            type="email"
            className="form-control"
            id="email"
            value={detailUser.data.email}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="text"
            className="form-control"
            id="phone"
            value={form.phone}
            onChange={onChangeHandler}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="bio" className="form-label">
            Bio
          </label>
          <textarea
            type="text"
            className="form-control"
            id="bio"
            rows={3}
            value={form.bio}
            onChange={onChangeHandler}
          />
        </div>
        {isLoading ? (
          <button
            className="btn bg-blue text-light p-2 w-100 mb-4"
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
            className="btn bg-blue text-light p-2 w-100 mb-4"
            type="submit"
          >
            Update
          </button>
        )}
      </form>
    </div>
  );
}
