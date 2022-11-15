/* eslint-disable consistent-return */
import axios from 'axios';
import {
  GET_DETAIL_USER_PENDING,
  GET_DETAIL_USER_SUCCESS,
  GET_DETAIL_USER_FAILED,
  GET_LIST_USER_PENDING,
  GET_LIST_USER_SUCCESS,
  GET_LIST_USER_FAILED,
  GET_DETAIL_RECEIVER_PENDING,
  GET_DETAIL_RECEIVER_SUCCESS,
  GET_DETAIL_RECEIVER_FAILED,
} from './types';

export const getDetailUser = (id, navigate, setPhotoIsLoading) => async (dispatch) => {
  const token = localStorage.getItem('token');

  try {
    dispatch({
      type: GET_DETAIL_USER_PENDING,
      payload: null,
    });

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
      headers: { token },
    });

    dispatch({
      type: GET_DETAIL_USER_SUCCESS,
      payload: res.data,
    });

    setPhotoIsLoading(false);
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
        return navigate('/login');
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_DETAIL_USER_FAILED,
      payload: error.message,
    });
  }
};

export const getDetailReceiver = (id, navigate) => async (dispatch) => {
  const token = localStorage.getItem('token');

  try {
    dispatch({
      type: GET_DETAIL_RECEIVER_PENDING,
      payload: null,
    });

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
      headers: { token },
    });

    dispatch({
      type: GET_DETAIL_RECEIVER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
        return navigate('/login');
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_DETAIL_RECEIVER_FAILED,
      payload: error.message,
    });
  }
};

export const getListUser = (search, navigate) => async (dispatch) => {
  const token = localStorage.getItem('token');

  try {
    dispatch({
      type: GET_LIST_USER_PENDING,
      payload: null,
    });

    const res = await axios.get(`${process.env.REACT_APP_API_URL}/user?search=${search}`, {
      headers: { token },
    });

    dispatch({
      type: GET_LIST_USER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    if (error.response) {
      if (parseInt(error.response.data.code, 10) === 401) {
        localStorage.clear();
        return navigate('/login');
      }

      error.message = error.response.data.error;
    }

    dispatch({
      type: GET_LIST_USER_FAILED,
      payload: error.message,
    });
  }
};

export const editProfile = async (data, setErrors) => {
  try {
    const id = localStorage.getItem('id');
    const token = localStorage.getItem('token');
    await axios.put(`${process.env.REACT_APP_API_URL}/user/${id}`, data, {
      headers: { token },
    });

    return true;
  } catch (error) {
    if (error.response) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([{ msg: error.response.data }]);
      }
    } else {
      setErrors([{ msg: error.message }]);
    }

    return false;
  }
};

export const editPhoto = async (data, setErrors) => {
  try {
    const token = localStorage.getItem('token');
    const id = localStorage.getItem('id');
    await axios.put(
      `${process.env.REACT_APP_API_URL}/user/${id}/photo`,
      data,
      {
        headers: { 'Content-Type': 'multipart/form-data', token },
      },
    );

    return true;
  } catch (error) {
    if (error.response) {
      if (Array.isArray(error.response.data.error)) {
        setErrors(error.response.data.error);
      } else {
        setErrors([{ msg: error.response.data.error }]);
      }
    } else {
      setErrors([{ msg: error.message }]);
    }

    return false;
  }
};
