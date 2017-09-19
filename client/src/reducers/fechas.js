import {
	GET_PACKS
} from '../actions/types';

export default function(state = [], action) {
	let fecha;
	switch(action.type) {
		/* case 'GET_COMPETITIONS':
			return [ ...action.payload ] */
		case 'GET_FECHAS':
			return action.payload;

		case 'ADD_FECHA':
			return state.concat(action.payload);

		case 'ADD_JUEGO':
			fecha = state.find(fecha => fecha.number === action.payload.fechaNumber);

			fecha.games = fecha.games.concat(action.payload.game);

			return [ ...state, ...fecha ];

		case 'CHANGE_GOALS':
			fecha = state.find(fecha => fecha.number === action.payload.fechaNumber);
			const game = fecha.games.find(game => game.number === action.payload.juegoNumber);

			game.goalsHome = action.payload.goalsHome;
			game.goalsAway = action.payload.goalsAway;
			fecha.games = [...fecha.games, ...game ];

			return [...state, ...fecha];

		case 'DELETE_GAME':
			fecha = state.find(fecha => fecha.number === action.payload.fechaNumber);
			const games = fecha.games.filter(game => game.number !== action.payload.juegoNumber);

			fecha.games = games;

			return [...state, ...fecha]

		case 'DELETE_FECHA':
			const fechas = state.filter(fecha => fecha.number !== action.payload.fechaNumber);

			return fechas
	}

	return state;
}