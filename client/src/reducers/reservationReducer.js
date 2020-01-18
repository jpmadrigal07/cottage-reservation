
import {
    GET_RESERVATIONS,
    ADD_RESERVATION,
    DELETE_RESERVATION,
    EDIT_RESERVATION_STATUS,
    RESERVATIONS_LOADING
  } from '../actions/types';
  
  const initialState = {
    reservations: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {  
      case GET_RESERVATIONS:
        return {
          ...state,
          reservations: action.payload,
          loading: false
        };
      case DELETE_RESERVATION:
        return {
          ...state,
          reservations: state.reservations.filter(reservation => reservation._id !== action.payload),
          loading: false
        };
      case ADD_RESERVATION:
        return {
          ...state,
          reservations: [...state.reservations, action.payload],
          loading: false
        };
      case EDIT_RESERVATION_STATUS:
        return {
          ...state,
          reservations: action.payload
        };
      case RESERVATIONS_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  