import axios from 'axios';
import { returnErrors } from './errorActions';
import { USER_LOADING, USER_LOADED, AUTH_ERROR } from './types';

export const fetchUser = () => dispatch => {
  dispatch({ type: USER_LOADING });
  axios
  .get('/api/current_user')
  .then(res =>
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  )
  .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status));
    dispatch({
      type: AUTH_ERROR
    });
  });
};

export const login = values => dispatch => {
  console.log(values)
  dispatch({ type: USER_LOADING });
    axios
    .post('/auth/local', values)
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      // console.log(err.response.data)
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

export const register = values => dispatch => {
  console.log(values)
  dispatch({ type: USER_LOADING });
    axios
    .post('/api/users', values)
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};