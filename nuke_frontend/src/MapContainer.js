import React from "react";
import MapGrid from "./MapGrid";
import "./style/MapContainer.css";

class MapContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      activePlayer: 1
    };
  }

  componentDidMount() {
    fetch(`http://localhost:3001/players`)
      .then(resp => resp.json())
      .then(players => this.setState({ players: players }));
  }

  handleClick = cell => {
    let gridsquareId = cell.id;
    let flipper = cell.shot === true ? false : true;

    if (cell.has_player === true) {
      alert("END GAME");
      // reset the database and bring everyone back to the homescreen
    }

    fetch(`http://localhost:3001/grid_squares/${gridsquareId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ shot: flipper })
    })
      .then(resp => resp.json())
      .then(gridsquare => this.props.updateGridsquare(gridsquare));

    this.nextTurn();
  };

  nextTurn = () => {
    let nextState = this.state.activePlayer === 1 ? 2 : 1;
    this.setState({
      activePlayer: nextState
    });
  };

  render() {
    console.log(this.state.activePlayer);

    return (
      <table>
        <tbody>
          <MapGrid
            gridsquares={this.props.gridsquares}
            handleClick={this.handleClick}
            activePlayer={this.state.activePlayer}
          />
        </tbody>
      </table>
    );
  }
}

export default MapContainer;
