import axios from 'axios';
import { GET_RESERVATIONS, ADD_RESERVATION, DELETE_RESERVATION, EDIT_RESERVATION_STATUS, RESERVATIONS_LOADING } from './types';
import { returnErrors } from './errorActions';

export const getReservations = () => dispatch => {
    dispatch(setReservationsLoading());
    axios
      .get('/api/reservation')
      .then(res =>
        dispatch({
          type: GET_RESERVATIONS,
          payload: res.data.reverse()
        })
      )
      .catch(err =>
        dispatch(returnErrors(err.response.data, err.response.status))
      );
  };

export const addReservation = (cottageId, userId, date, history) => dispatch => {
  dispatch(setReservationsLoading());
  axios
    .post('/api/reservation', {cottageId: cottageId, userId: userId, date: date})
    .then(res =>
      dispatch({
        type: ADD_RESERVATION,
        payload: res.data
      }),
      history.push('/reservations')
    )
    .catch(err => 
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteReservation = id => dispatch => {
  dispatch(setReservationsLoading());
  axios
    .delete(`/api/reservation/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_RESERVATION,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const editReservationStatus = (id, status) => dispatch => {
  axios
    .put('/api/reservation/status/'+id, {status: status})
    .then(res =>
      dispatch({
        type: EDIT_RESERVATION_STATUS,
        payload: res.data.reverse()
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setReservationsLoading = () => {
    return {
      type: RESERVATIONS_LOADING
    };
  };