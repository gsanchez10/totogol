import React, { Component } from 'react';
import ReactTable from 'react-table';
import { connect } from 'react-redux';
import * as actions from '../actions';

import 'react-table/react-table.css';

class AgregarJuego extends Component {
	constructor(props) {
		super(props);

		this.state = {
			gamesToAdd: []
		};
	}

	handleFormSubmit({ email, password }) {
		console.log(email, password);
		this.props.signinUser({ email, password });
	}

	renderAlert() {
		if(this.props.errorMessage) {
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	render() {

		return (
			<form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
				<fieldset className="form-group">
					<label>Equipo Casa:</label>
					<Field name="homeTeam" component="input" type="text" className="form-control"/>
				</fieldset>
				<fieldset className="form-group">
					<label>Equipo Visita:</label>
					<Field name="awayTeam" component="input" type="text" className="form-control"/>
				</fieldset>
				{this.renderAlert()}
				<button action="submit" className="btn btn-primary">Agregar</button>
			</form>
		);
	}
}

export default connect(null, actions)(AgregarJuego);