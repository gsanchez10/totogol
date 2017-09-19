import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Cuenta extends Component {
  handleCambiarContrasena(e) {
    e.preventDefault();
    this.props.changePassword({ username: this.props.user.username, password: this.refs.password.value });
  }

  componentDidMount() {
    this.props.userInfo();
  }

  renderAlert() {
    if(this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
    if(this.props.passwordChangeResult) {
      return (
        <div className="alert alert-success">
          Contraseña actualizada exitosamente.
        </div>
      );
    }
  }

  render() {
    const userInfo = this.props.user && (
      <ul>
        <li><strong>Usuario:</strong> {this.props.user.username}</li>
        <li><strong>Correo:</strong> {this.props.user.email}</li>
      </ul>
    );
    return (
      <div className="cuenta">
        <h1>Cuenta</h1>
        {userInfo}
        <form onSubmit={this.handleCambiarContrasena.bind(this)}>
          <fieldset className="form-group">
            <label>Cambiar contraseña:</label>
            <input name="password" type="password" className="form-control" ref="password"/>
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">Cambiar</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    passwordChangeResult: state.auth.passwordChangeResult
  }
}

export default connect(mapStateToProps, actions)(Cuenta);
