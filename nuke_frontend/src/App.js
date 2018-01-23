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
      startScreen: true,
      civiliansKilled: 0,
      activeWeapon: {},
      blastRadius: 1,
      mapWidth: 0,
      mapLength: 0
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
    // const side = Math.sqrt(gridsquares.length);
    const width = 50;
    const length = gridsquares.length / 50;

    this.setState({
      mapWidth: width,
      mapLength: length
    });

    const range = [...Array(length).keys()];
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

  handleHover = cell => {
    let blastRadius = this.state.blastRadius;
    let blastWidth = this.state.blastRadius * 2 + 1;
    let column = cell.x_coord - 1;
    let row = cell.y_coord - 1;
    let localGridSquares = this.state.gridsquares;

    for (let y of this.range(blastWidth, row - blastRadius)) {
      for (let x of this.range(blastWidth, column - blastRadius)) {
        let yaway = Math.abs(row - y); // how many rows away i am from home row
        let xaway = Math.abs(column - x); // how many columns i am from home column
        console.log(x, y);
        if (
          y >= this.state.mapLength + 1 ||
          y <= -1 ||
          x >= this.state.mapWidth + 1 ||
          x <= -1
        ) {
          return null;
        } else if (xaway + yaway >= blastRadius + 1) {
          localGridSquares[y][x].targeted = false;
        } else {
          localGridSquares[y][x].targeted = true;
        }
      }
    }

    // localGridSquares[row][column].targeted = true;

    this.setState({ gridsquares: localGridSquares });
  };

  handleLeave = cell => {
    let blastRadius = this.state.blastRadius;
    let blastWidth = this.state.blastRadius * 2 + 1;
    let column = cell.x_coord - 1;
    let row = cell.y_coord - 1;
    let localGridSquares = this.state.gridsquares;

    for (let y of this.range(blastWidth, row - blastRadius)) {
      for (let x of this.range(blastWidth, column - blastRadius)) {
        if (
          y >= this.state.mapLength + 1 ||
          y <= -1 ||
          x >= this.state.mapWidth + 1 ||
          x <= -1
        ) {
          return null;
        } else {
          localGridSquares[y][x].targeted = false;
        }
      }
    }

    this.setState({ gridsquares: localGridSquares });
  };

  range = (length, lowerBound) => {
    return Array.from(new Array(length), (x, i) => i + lowerBound);
  };

  updateShot = cell => {
    const row = cell.y_coord - 1;
    const column = cell.x_coord - 1;

    let localGridsquares = this.state.gridsquares;
    localGridsquares[row][column].shot = true;

    this.setState({ gridsquares: localGridsquares });
  };

  updateHidingSpot = gridsquare => {
    const rowIndex = gridsquare.y_coord - 1;
    const columnIndex = gridsquare.x_coord - 1;

    let localGridsquares = this.state.gridsquares;
    localGridsquares[rowIndex][columnIndex].has_player = true;

    this.setState({ gridsquares: localGridsquares });
  };

  startGame = () => {
    this.setState({
      startScreen: false
    });
    this.nextTurn();
  };

  resetGame = () => {
    this.setState({
      startScreen: true,
      activePlayer: 1,
      activeWeapon: {}
    });
    this.fetchGridSquares();
    this.fetchPlayers();
  };

  nextTurn = () => {
    let nextState = this.state.activePlayer === 1 ? 2 : 1;
    this.setState({
      activePlayer: nextState,
      activeWeapon: {}
    });
    this.fetchPlayers();
  };

  handleSelection = weapon => {
    this.setState({ activeWeapon: weapon });
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
                  updateShot={this.updateShot}
                  updateHidingSpot={this.updateHidingSpot}
                  activePlayer={this.state.activePlayer}
                  startScreen={this.state.startScreen}
                  startGame={this.startGame}
                  nextTurn={this.nextTurn}
                  activeWeapon={this.state.activeWeapon}
                  handleHover={this.handleHover}
                  handleLeave={this.handleLeave}
                  {...this.props}
                />
              </div>
              <div className="control-panel">
                <ControlPanel
                  players={this.state.players}
                  activePlayer={this.state.activePlayer}
                  nextTurn={this.nextTurn}
                  resetGame={this.resetGame}
                  activeWeapon={this.state.activeWeapon}
                  handleSelection={this.handleSelection}
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
