import { combineReducers } from 'redux';
import cottageReducer from './cottageReducer';
import reservationsReducer from './reservationReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
  error: errorReducer,
  cottage: cottageReducer,
  reservation: reservationsReducer,
  auth: authReducer
});
