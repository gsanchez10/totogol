import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm  } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit({ email, username, password }) {
    this.props.signupUser({ email, username, password });
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
        <h1>Registrarse</h1>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>Correo:</label>
            <Field name="email" component="input" type="text" className="form-control"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Usuario:</label>
            <Field name="username" component="input" type="text" className="form-control"/>
          </fieldset>
          <fieldset className="form-group">
            <label>Contraseña:</label>
            <Field name="password" component="input" type="password" className="form-control"/>
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Registrarse</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignup = reduxForm({
  form: 'signin',
  fields: ['email', 'username', 'password']
})(Signup);

export default connect(mapStateToProps, actions)(reduxFormSignup);