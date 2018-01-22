import React from "react";
import { Route, withRouter } from "react-router-dom";
import MapContainer from "./MapContainer";
import ControlPanel from "./ControlPanel";
import "./style/App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      gridsquares: [],
      players: [],
      activePlayer: 1,
      startScreen: true
    };
  }

  componentDidMount() {
    this.fetchGridSquares();
    this.fetchPlayers();
  }

  fetchGridSquares() {
    fetch("http://localhost:3001/grid_squares")
      .then(resp => resp.json())
      .then(gridsquares => this.setMap(gridsquares));
  }

  fetchPlayers() {
    fetch("http://localhost:3001/players")
      .then(resp => resp.json())
      .then(players => this.setState({ players: players }));
  }

  setMap = gridsquares => {
    const side = Math.sqrt(gridsquares.length);
    const range = [...Array(side).keys()];
    const output = [];

    for (let y of range) {
      output.push([]);

      // need to make rowSquares a hash...

      let rowSquares = gridsquares
        .filter(gridsquare => {
          return gridsquare["y_coord"] === y + 1;
        })
        .sort((a, b) => {
          return a["x_coord"] - b["x_coord"];
        });

      for (let square in rowSquares) {
        output[y].push(rowSquares[square]);
      }
    }

    this.setState({ gridsquares: output });
  };

  updateGridsquare = gridsquare => {
    const rowIndex = gridsquare.y_coord - 1;
    const columnIndex = gridsquare.x_coord - 1;

    let localGridsquares = this.state.gridsquares;
    localGridsquares[rowIndex][columnIndex].shot =
      localGridsquares[rowIndex][columnIndex].shot === true ? false : true;

    this.setState({ gridsquares: localGridsquares });
  };

  startGame = () => {
    this.setState({
      startScreen: false
    });
    this.nextTurn(); // do we want P1 or P2 to start the game?
  };

  nextTurn = () => {
    let nextState = this.state.activePlayer === 1 ? 2 : 1;
    this.setState({
      activePlayer: nextState
    });
  };

  render() {
    return (
      <div>
        <Route
          path="/"
          render={() => (
            <div className="wrapper">
              <div className="header">Welcome to the nuke game</div>
              <div className="map-header">Map Header</div>
              <div className="control-header"> Control Header</div>
              <div className="map-container">
                <MapContainer
                  gridsquares={this.state.gridsquares}
                  updateGridsquare={this.updateGridsquare}
                  activePlayer={this.state.activePlayer}
                  startScreen={this.state.startScreen}
                  startGame={this.startGame}
                  nextTurn={this.nextTurn}
                  {...this.props}
                />
              </div>
              <div className="control-panel">
                <ControlPanel
                  activePlayer={this.state.activePlayer}
                  nextTurn={this.nextTurn}
                  {...this.props}
                />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default withRouter(App);
