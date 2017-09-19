import React, { Component } from 'react';

import Juego from './juegos';

class Fecha extends Component {
	constructor(props) {
    super(props);

    this.state = {
      menuOpen: false
    }
  }

	renderGames() {
    const now = new Date();
    const closingDate = new Date(this.props.fecha.closingDate);
    const cerrada = now > closingDate;
		return this.props.fecha.games.map(game => <Juego key={game.number} cerrada={cerrada} juego={game} administrar={this.props.administrar} changeGoals={this.changeGoals.bind(this)} deleteJuego={this.deleteJuego.bind(this)}/>);
	}

	addJuego() {
		this.props.addJuego({
			homeTeam: this.refs.homeTeam.value,
			awayTeam: this.refs.awayTeam.value
		}, this.props.fecha.number);
		this.refs.homeTeam.value = '';
		this.refs.awayTeam.value = '';
	}

	changeGoals(params) {
		params.fechaNumber = this.props.fecha.number;

		this.props.changeGoals(params);
	}

  deleteJuego(params) {
    params.fechaNumber = this.props.fecha.number;

    this.props.deleteJuego(params);
  }

  deleteFecha() {
    const params = {
      fechaNumber: this.props.fecha.number
    };

    this.props.deleteFecha(params);
  }

	openMenu() {
    this.setState({ menuOpen: !this.state.menuOpen });
  }

	renderMenuOptions() {
    if(this.state.menuOpen) {
      return (
        <div className="menuOptions">
          <button onClick={this.deleteFecha.bind(this)}>Borrar</button>
        </div>
      );
    }
  }

  renderAddJuego() {
    if(!this.props.administrar) {
      return null;
    }

    return (
      <div className="juego">
        <span className="homeTeamName">
          <input type="text" ref="homeTeam"/>
        </span> vs <span className="awayTeamName">
          <input type="text" ref="awayTeam"/>
        </span> <button className="btn" onClick={this.addJuego.bind(this)}>Agregar juego</button>
      </div>
    );
  }

  renderClosingDate() {
    if(!this.props.fecha.closingDate) {
      return null;
    }

    const closingDate = new Date(this.props.fecha.closingDate);
    return closingDate.getDate() + '/' + (closingDate.getMonth() + 1) + '/' + closingDate.getFullYear() + ' ' + closingDate.getHours() + ':' + (closingDate.getMinutes() === 0 ? '00' : closingDate.getMinutes());
  }

	render() {
    const options = this.props.administrar && <button onClick={this.openMenu.bind(this)} className="options">
      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
    </button>;

		return (
			<div className="fecha">
				<h2>
					Fecha: {this.props.fecha.number} <span className="closingDate">({this.renderClosingDate()})</span>
					{options}
				</h2>
        {this.renderMenuOptions()}
				<div style={{paddingLeft:'15px'}}>
					{this.renderGames()}
          {this.renderAddJuego()}
				</div>
			</div>
		);
	}
}

export default Fecha;