import axios from 'axios';
import { GET_COTTAGES, ADD_COTTAGE, DELETE_COTTAGE, COTTAGES_LOADING } from './types';
import { returnErrors } from './errorActions';

export const getCottages = () => dispatch => {
  dispatch(setCottagesLoading());
  axios
    .get('/api/cottage')
    .then(res =>
      dispatch({
        type: GET_COTTAGES,
        payload: res.data.reverse()
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addCottage = (cottage, history) => dispatch => {
  dispatch(setCottagesLoading());
  axios
    .post('/api/cottage', cottage)
    .then(res =>
      dispatch({
        type: ADD_COTTAGE,
        payload: res.data
      }),
      // history.push('/my-posts')
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteCottage = id => dispatch => {
  dispatch(setCottagesLoading());
  axios
    .delete(`/api/cottage/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_COTTAGE,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setCottagesLoading = () => {
  return {
    type: COTTAGES_LOADING
  };
};