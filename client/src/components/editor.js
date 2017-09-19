import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Fecha from './fecha';

class Editor extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fechas: [
				{
					number: 1,
					juegos: [
						{
							number: 1,
							date: '09/03/2017',
							homeTeam: 'Deportivo Saprissa',
							awayTeam: 'Municipal Grecia'
						}
					]
				}
			],
			error: '',
			newFechaDate: new Date()
		};
	}

	componentDidMount() {
		this.props.getFechas();
	}

	handleAddFecha() {
		/* this.setState({
			fechas: this.state.fechas.concat(
				{
					number: this.state.fechas.length+1,
					games: []
				}
			)
		}); */
		if(!this.refs.fechaNumber.value) {
			this.setState({error: 'Debe introducir un numero de fecha.'});
			return false;
		}
		const fecha = {
			number: this.refs.fechaNumber.value,
			games: [],
			closingDate: this.state.newFechaDate
		};
		this.props.addFecha(fecha);
		this.refs.fechaNumber.value = '';
		this.setState({error: ''});
	}

	handleAddJuego(game, fechaNumber) {
		/* const fecha = this.state.fechas.find(fecha => fecha.number === fechaNumber);
		game.number = fecha.juegos.length+1;

		const newFecha = fecha;
		newFecha.juegos = newFecha.juegos.concat(game);
		this.setState({
			fechas: [ ...this.state.fechas, ...newFecha ]
		}) */
		const fecha = this.props.fechas.find(fecha => fecha.number === fechaNumber);

		game.number = fecha && fecha.games && fecha.games.length+1;
		this.props.addGame({ game, fechaNumber });
	}

	handleChangeGoals(params) {
		this.props.changeGoals(params);
	}

	handleDeleteGame(params) {
		this.props.deleteGame(params);
	}

	handleDeleteFecha(params) {
		this.props.deleteFecha(params);
	}

	renderError() {
		if(this.state.error) {
			return <div className="alert alert-danger">{this.state.error}</div>;
		}
		return null;
	}

	changeDate(event) {
		const [ year, month, date ] = event.currentTarget.value.split('-');
		const currentDate = new Date(year, month-1, date);
		this.setState({ newFechaDate: currentDate });
	}

	changeTime(event) {
		const currentDate = this.state.newFechaDate;
		const [ hours, minutes ] = event.currentTarget.value.split(':');
		currentDate.setHours(hours);
		currentDate.setMinutes(minutes);
		this.setState({ newFechaDate: currentDate });
	}

	render() {
		const fechas = this.props.fechas.map(fecha => <Fecha key={fecha.number} administrar="true" fecha={fecha} addJuego={this.handleAddJuego.bind(this)} changeGoals={this.handleChangeGoals.bind(this)} deleteJuego={this.handleDeleteGame.bind(this)} deleteFecha={this.handleDeleteFecha.bind(this)} />);

		return (
			<div>
				<h1>Editor</h1>
				{fechas}
				<div className="agregarFecha">
					<h3>Agregar Fecha <i className="fa fa-futbol-o" aria-hidden="true"></i></h3>
					{this.renderError()}
					<div>
						<label htmlFor="fechaNumber">Número:</label> <input name="fechaNumber" type="text" ref="fechaNumber"/>
					</div>
					<div>
						<label htmlFor="fechaDate">Fecha de cierre de fecha: </label> <input name="fechaDate" type="date" ref="fechaDate" onChange={this.changeDate.bind(this)}/> <input type="time" onChange={this.changeTime.bind(this)} />
					</div>
					<button className="btn" onClick={this.handleAddFecha.bind(this)}>Agregar Fecha</button>{this.state.newFechaDate.toString()}
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		fechas: state.fechas
	}
}

export default connect(mapStateToProps, actions)(Editor);