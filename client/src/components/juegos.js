import React, { Component } from 'react';

class Juego extends Component {
  changeGoals() {
    const params = {
      juegoNumber: this.props.juego.number,
      goalsHome: this.refs.goalsHome && this.refs.goalsHome.value,
      goalsAway: this.refs.goalsAway && this.refs.goalsAway.value
    }
    this.props.changeGoals(params);
  }

  deleteJuego() {
    const params = {
      juegoNumber: this.props.juego.number
    }
    this.props.deleteJuego(params);
  }

  render() {
    const { goalsHome, goalsAway } = this.props.juego;
    const options = this.props.administrar && <button className="options" onClick={this.deleteJuego.bind(this)}><i className="fa fa-times" aria-hidden="true"></i></button>;
    const goalsHomeInput = !this.props.administrar &&
    this.props.cerrada &&
    <input type="number" ref="goalsHome" className="goalsInput" min="0" value={goalsHome} disabled /> ||
    <input type="number" ref="goalsHome" className="goalsInput" min="0" value={goalsHome} onChange={this.changeGoals.bind(this)} />;
    
    const goalsAwayInput = !this.props.administrar &&
    this.props.cerrada &&
    <input type="number" ref="goalsAway" className="goalsInput" min="0" value={goalsAway} disabled /> ||
    <input type="number" ref="goalsAway" className="goalsInput" min="0" value={goalsAway} onChange={this.changeGoals.bind(this)} />;
    return (
      <div className="juego">
        <span className="homeTeamName">
          {this.props.juego.homeTeam}&nbsp;
          {goalsHomeInput}
        </span>  vs  <span className="awayTeamName">
          {goalsAwayInput}
          &nbsp;{this.props.juego.awayTeam}
        </span>
        {options}
      </div>
    );
  }
}

export default Juego;