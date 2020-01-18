
import {
    GET_COTTAGES,
    ADD_COTTAGE,
    DELETE_COTTAGE,
    COTTAGES_LOADING
  } from '../actions/types';
  
  const initialState = {
    cottages: [],
    loading: false
  };
  
  export default function(state = initialState, action) {
    switch (action.type) {  
      case GET_COTTAGES:
        return {
          ...state,
          cottages: action.payload,
          loading: false
        };
      case DELETE_COTTAGE:
        return {
          ...state,
          cottages: state.cottages.filter(cottage => cottage._id !== action.payload),
          loading: false
        };
      case ADD_COTTAGE:
        return {
          ...state,
          cottages: [...state.cottages, action.payload],
          loading: false
        };
      case COTTAGES_LOADING:
        return {
          ...state,
          loading: true
        };
      default:
        return state;
    }
  }
  