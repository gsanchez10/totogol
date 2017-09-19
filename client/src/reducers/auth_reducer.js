import {
	AUTH_USER,
	UNAUTH_USER,
	AUTH_ERROR
} from '../actions/types';

export default function(state = {}, action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, user: action.payload && action.payload.data.user, authenticated: true };
		case UNAUTH_USER:
			return { ...state, user: null, authenticated: false };
		case AUTH_ERROR:
			return { ...state, error: action.payload };
		case 'PLAYER_GOALS_CHANGE':
			return { ...state, user: action.payload.data.user }
		case 'PASSWORD_CHANGED':
			return { ...state, passwordChangeResult: action.payload }
	}

	return state;
}