import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const ResultadosComponent = (props) => {
  const usersResults = props.fechas.map(systemFecha => {
    const modifiedFecha = Object.assign({}, systemFecha);
    const modifiedFechaGames = modifiedFecha.games.map(systemGame => {
      const modifiedGame = Object.assign({}, systemGame);
      const predictions = [];
      props.users.forEach(user => {
        user.fechas.forEach(userFecha => {
          //modifiedFecha.points = 0;
          userFecha.games.forEach(userGame => {
            if(userGame.number === modifiedGame.number && userFecha.number === modifiedFecha.number) {
              const prediction = {
                username: user.username,
                goalsHome: userGame.goalsHome,
                goalsAway: userGame.goalsAway,
                points: 0
              };

              const systemGoalsHome = parseInt(systemGame.goalsHome);
              const systemGoalsAway = parseInt(systemGame.goalsAway);

              const gameGoalsHome = parseInt(userGame.goalsHome);
              const gameGoalsAway = parseInt(userGame.goalsAway);

              const systemResult = systemGame.goalsHome && systemGame.goalsAway && (systemGoalsHome >= systemGoalsAway ? (systemGoalsHome === systemGoalsAway ? 'tie':'home'):'away') || '';
              const gameResult = userGame.goalsHome === '' && userGame.goalsAway === '' ? '' : (userGame.goalsHome >= userGame.goalsAway ? (userGame.goalsHome === userGame.goalsAway ? 'tie':'home'):'away');

              if(systemResult === gameResult) {
                prediction.points += 1;
                //modifiedFecha.points += 1;
                if(userGame.goalsHome !== '' && userGame.goalsAway !== '' && systemGoalsHome === gameGoalsHome && systemGoalsAway === gameGoalsAway) {
                  prediction.points += 2;
                  //modifiedFecha.points += 2;
                }
              }

              predictions.push(prediction);
            }
          });
        });
      });
      modifiedGame.predictions = predictions;
      return modifiedGame;
    });
    modifiedFecha.games = modifiedFechaGames;

    return modifiedFecha;
  });

  const totalPoints = {};
  const renderResults = <div>
    {
      usersResults.map(fecha => {
        const usernames = fecha.games[0].predictions.map(prediction => <th key={prediction.username}><div>{prediction.username}</div></th>);
        const tableRowsHead = (
          <tr>
            <th>Partido</th>
            <th>Marcador final</th>
            {usernames}
          </tr>
        );
          
        const tableRowsBody = fecha.games.map(game => {
          const usersPredictions = game.predictions.map(prediction => <td key={prediction.username + '-' + fecha.number + '-' + game.number}>{prediction.goalsHome} - {prediction.goalsAway}</td>);
          return (<tr key={game.homeTeam + '-' + game.awayTeam}>
            <td>{game.homeTeam} vs {game.awayTeam}</td>
            <td>{game.goalsHome} - {game.goalsAway}</td>
            {usersPredictions}
          </tr>);
        });

        const points = {};
        fecha.games.forEach(game => {
          game.predictions.map(prediction => {
            points[prediction.username] = points[prediction.username] && points[prediction.username] + prediction.points || prediction.points;
          });
        });
        totalPoints[fecha.number] = points;

        const usersTotalPoints = Object.keys(points) && Object.keys(points).map(username => {
          return <td key={'points-' + username}>{points[username] || 0}</td>
        });

        const tableRowsFooter = (
          <tr>
            <td>Puntos totales</td>
            <td></td>
            {usersTotalPoints}
          </tr>
        );

        return (
          <div key={fecha.number} className="puntosFecha">
            <h2>Fecha {fecha.number}</h2>
            <table className="table">
              <thead>
                {tableRowsHead}
              </thead>
              <tbody>
                {tableRowsBody}
              </tbody>
              <tfoot>
                {tableRowsFooter}
              </tfoot>
            </table>
          </div>
        );
      })
    }
  </div>;

  let usersWithPoints = [];
  Object.keys(totalPoints).forEach(fechaNumber => {
    Object.keys(totalPoints[fechaNumber]).forEach(username => {
      let user = usersWithPoints.find(u => u.username === username);
      if(user) {
        user.fechas.push({ number: fechaNumber, points: totalPoints[fechaNumber][username]});
        user.totalPoints += totalPoints[fechaNumber][username];
      }else {
        user = {
          username: username,
          fechas: [
            {
              number: fechaNumber,
              points: totalPoints[fechaNumber][username]
            }
          ],
          totalPoints: totalPoints[fechaNumber][username]
        };
        usersWithPoints.push(user);
      }
    });
  });

  let pointsStr = ''
  usersWithPoints.forEach(u => pointsStr += `username: ${u.username}, points: ${u.totalPoints} - `);
  alert(pointsStr);
  pointsStr = ''

  usersWithPoints.sort((a, b) => a.totalPoints - b.totalPoints);
  usersWithPoints.forEach(u => pointsStr += `username: ${u.username}, points: ${u.totalPoints} - `);
  alert(pointsStr);


  const pointsTableThs = usersWithPoints &&
  usersWithPoints[0] &&
  usersWithPoints[0].fechas.map(fecha => <th key={'th-'+fecha.number}>Fecha {fecha.number}</th>);

  const pointsTableTrs = usersWithPoints &&
  usersWithPoints.map(user => {
    return (
      <tr key={user.username}>
        <td>{user.username}</td>
        {user.fechas && user.fechas.map(fecha => <td key={user.username + '-' + fecha.number}>{fecha.points}</td>)}
        <td>{user.totalPoints}</td>
      </tr>
    );
  });
  
  const totalsTable = (
    <div className="totalsTable">
      <h2>Tabla General de Posiciones</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Usuario</th>
            {pointsTableThs}
            <th>Puntos totales</th>
          </tr>
        </thead>
        <tbody>
          {pointsTableTrs}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="resultados-component">
      {renderResults}
      {totalsTable}
    </div>
  );
}

class Resultados extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: []
    };
  }

  componentDidMount() {
    this.props.getFechas();
    //const fechas = [{"_id":"59ade758b6e2a4bdc18dec04","number":1,"closingDate":"2017-01-01T00:00:00.000Z","__v":6,"games":[{"goalsAway":"1","goalsHome":"6","number":1,"awayTeam":"Municipal Grecia","homeTeam":"Deportivo Saprissa"}]},{"_id":"59af373ffa27d9ff989c2329","number":2,"closingDate":"2017-09-05T00:00:00.000Z","__v":3,"games":[{"goalsAway":"1","goalsHome":"1","number":1,"awayTeam":"Brasil","homeTeam":"Colombia"},{"goalsAway":"1","goalsHome":"1","number":2,"awayTeam":"USA","homeTeam":"Honduras"},{"goalsAway":"1","goalsHome":"1","number":3,"awayTeam":"Mexico","homeTeam":"Costa Rica"}]},{"_id":"59b21da2e5625185bc98e410","number":3,"closingDate":"2017-09-30T19:59:00.000Z","__v":10,"games":[{"goalsAway":"0","goalsHome":"3","number":1,"awayTeam":"Anderlecht","homeTeam":"Bayern"},{"goalsAway":"0","goalsHome":"3","number":2,"awayTeam":"FC Basel","homeTeam":"Mancheser United"},{"goalsAway":"5","goalsHome":"0","number":3,"awayTeam":"Paris Saint Germain","homeTeam":"Celtic"},{"goalsAway":"0","goalsHome":"0","number":4,"awayTeam":"Atletico de Madrid","homeTeam":"Roma"},{"goalsAway":"0","goalsHome":"3","number":5,"awayTeam":"Juventus","homeTeam":"Barcelona"},{"number":6,"awayTeam":"Sevilla","homeTeam":"Liverpool"},{"number":7,"awayTeam":"Apoel FC","homeTeam":"Real Madrid"},{"number":8,"awayTeam":"Borussia Dortmund","homeTeam":"Tottenham"}]}];
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.fechas !== nextProps.fechas) {
      this.props.getPlayersWithPoints(nextProps.fechas);
    }
  }

  renderCols(games) {
    return games.map(game => <td>{game.goalsHome}</td>);
  }

  renderRows(fecha, user) {
    return user.fechas.map(currentFecha => {
      if(currentFecha.number === fecha.number) {
        return <tr><td>{user.username}</td>{this.renderCols(currentFecha.games)}</tr>
      }
    });
  }

  renderResultados() {
    
    return this.state.users.length && this.state.users.map(user => <div><span>{user.username}</span><span>{user.points || 0}</span></div>);
    /* return this.props.fechas.map(fecha => {
      return (
        <table className="table">
          <thead>
            <tr>
              {fecha.games.map(game => <th>{game.homeTeam}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => 
              this.renderRows(fecha, user)
            )}
          </tbody>
        </table>
      );
    }); */
  }

  render() {
    return (
      <div>
        <h1>Resultados</h1>
        <ResultadosComponent users={this.props.users} fechas={this.props.fechas} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    fechas: state.fechas,
    users: state.users
  };
}

export default connect(mapStateToProps, actions)(Resultados);
