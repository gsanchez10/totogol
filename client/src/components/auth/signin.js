import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm  } from 'redux-form';
import * as actions from '../../actions';

class Signin extends Component {
	handleFormSubmit({ username, password }) {
		console.log(username, password);
		this.props.signinUser({ username, password });
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
		const { handleSubmit } = this.props;

		return (
			<div>
				<h1>Entrar</h1>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<fieldset className="form-group">
						<label>Usuario:</label>
						<Field name="username" component="input" type="text" className="form-control"/>
					</fieldset>
					<fieldset className="form-group">
						<label>Contraseña:</label>
						<Field name="password" component="input" type="password" className="form-control"/>
					</fieldset>
					{this.renderAlert()}
					<button action="submit" className="btn btn-primary">Entrar</button>
				</form>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.error };
}

const reduxFormSignin = reduxForm({
	form: 'signin',
	fields: ['username', 'password']
})(Signin);

export default connect(mapStateToProps, actions)(reduxFormSignin);
