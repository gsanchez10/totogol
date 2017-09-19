import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
import fechas from './fechas';
import users from './users';

const rootReducer = combineReducers({
	form,
	auth: authReducer,
	fechas: fechas,
  users: users
});

export default rootReducer;
