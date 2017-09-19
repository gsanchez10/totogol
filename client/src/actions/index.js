import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, GET_PACKS, UNAUTH_USER } from './types';

//const ROOT_URL = 'http://localhost:' + process.env.PORT || 3090;
const ROOT_URL = 'https://totogol.herokuapp.com';

export function signinUser({ username, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signin`, { username, password })
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_USER, payload: response });
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
				// - redirect to the route '/feature'
				browserHistory.push('/jugar');
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				dispatch(authError('Correo o contraseña incorrecto.'));
			})
	}
}

export function userInfo() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/userInfo`, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_USER, payload: response });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				dispatch(authError('Correo o contraseña incorrecto.'));
			})
	}
}

export function signoutUser() {
	localStorage.removeItem('token');
	browserHistory.push('/entrar');

	return {
		type: UNAUTH_USER
	}
}

export function signupUser({ email, username, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/signup`, { email, username, password })
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: AUTH_USER });
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
				// - redirect to the route '/feature'
				browserHistory.push('/jugar');
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				dispatch(authError('No se pudo registrar.'));
			})
	}
}

export function changePassword({ username, password }) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/changePassword`, { username, password }, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: 'PASSWORD_CHANGED', payload: response.data.result });
				// - Save the JWT token
				localStorage.setItem('token', response.data.token);
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				dispatch(authError('No se pudo cambiar.'));
			})
	}
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
}

export function getCompetitions() {
	return function(dispatch) {
		axios.get('http://api.football-data.org/v1/competitions/?season=2017', { headers: { 'X-Auth-Token': '56c224c9f1ec483095b2c742a01336c2' }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				// - Update state to indicate user is authenticated
				dispatch({ type: 'GET_COMPETITIONS', payload: response.data });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function getFechas() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/fechas`, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'GET_FECHAS', payload: response.data });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function getPlayers() {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/getPlayers`, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'GET_PLAYERS', payload: response.data });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function addFecha(fecha) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/addFecha`, fecha, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'ADD_FECHA', payload: fecha });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function addGame(params) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/addGame`, params, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'ADD_JUEGO', payload: params });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function changeGoals(params) {
	return function(dispatch) {
		axios.put(`${ROOT_URL}/changeGoals`, params, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'CHANGE_GOALS', payload: params });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function deleteGame(params) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/deleteGame`, params, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'DELETE_GAME', payload: params });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function deleteFecha(params) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/deleteFecha`, params, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'DELETE_FECHA', payload: params });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function changePlayerGoals(fechas) {
	return function(dispatch) {
		axios.post(`${ROOT_URL}/changePlayerGoals`, fechas, { headers: { 'authorization': localStorage.getItem('token') }})
			// Submit email/password to the server
			.then(response => {
				// If request is good...
				dispatch({ type: 'PLAYER_GOALS_CHANGE', payload: response });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}

export function getPlayersWithPoints(systemFechas) {
	return function(dispatch) {
		axios.get(`${ROOT_URL}/getPlayers`, { headers: { 'authorization': localStorage.getItem('token') }})
			.then(response => {
				const users = response.data;
				if(users.length) {
		      users.forEach(user => {
		      	if(user.username === 'gsanchez') {
			        user.points = 0;
			        user.fechas.forEach(fecha => {
			          fecha.points = 0;
			          const systemFecha = systemFechas.find(systemFecha => systemFecha.number === fecha.number);
			          fecha.games.forEach(game => {
			            const systemGame = systemFecha && systemFecha.games && systemFecha.games.find(propsGame => propsGame.number === game.number);

			            if(systemGame) {
				            const systemGoalsHome = parseInt(systemGame.goalsHome);
				            const systemGoalsAway = parseInt(systemGame.goalsAway);

				            const gameGoalsHome = parseInt(game.goalsHome);
				            const gameGoalsAway = parseInt(game.goalsAway);

				            const systemResult = systemGoalsHome >= systemGoalsAway ? (systemGoalsHome === systemGoalsAway ? 'tie':'home'):'away';
				            const gameResult = game.goalsHome === '' && game.goalsAway === '' ? '' : (game.goalsHome >= game.goalsAway ? (game.goalsHome === game.goalsAway ? 'tie':'home'):'away');

				            if(systemResult === gameResult) {
				              user.points += 1;
				              fecha.points += 1;
				              if(game.goalsHome !== '' && game.goalsAway !== '' && systemGoalsHome === gameGoalsHome && systemGoalsAway === gameGoalsAway) {
				                user.points += 2;
				                fecha.points += 2;
				              }
				            }
			            }
			            
			          });
			        });
			      }
		        return user;
		      });
		    }

				// If request is good...
				dispatch({ type: 'GET_PLAYERS', payload: users });
			})
			.catch(() => {
				// If request is bad...
				// - Show an arror to the user
				// dispatch(authError('Error obteniendo paquetes.'));
			})
	}
}
