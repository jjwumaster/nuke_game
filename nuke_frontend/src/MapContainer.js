import React from "react";
import MapGrid from "./MapGrid";
import "./style/MapContainer.css";

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch(`http://localhost:3001/players`)
      .then(resp => resp.json())
      .then(players => this.setState({ players: players }));
  }

  handleClick = cell => {
    let gridsquareId = cell.id;
    let flipper = cell.shot === true ? false : true;

    if (cell.has_player === true && this.props.activePlayer === 2) {
      alert("END GAME");

      this.endGame();
    } else if (cell.has_player === true && this.props.activePlayer === 1) {
      alert("You idiot!");

      this.endGame();
    } else {
      let activePlayerName =
        this.props.activePlayer === 1 ? "Donald J Trump" : "Kim Jong Un";
      alert(`Successful bombing run! ${activePlayerName}'s turn!`);
    }

    fetch(`http://localhost:3001/grid_squares/${gridsquareId}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ shot: flipper })
    })
      .then(resp => resp.json())
      .then(gridsquare => this.props.updateGridsquare(gridsquare));

    this.props.nextTurn();
  };

  endGame = () => {
    fetch("http://localhost:3001/end/", {
      method: "PATCH"
    });
    this.props.history.push("/end"); // AND change parent state
  };

  onClickStart = cell => {
    const xCoord = cell.x_coord;
    const yCoord = cell.y_coord;

    if (!cell.land) {
      alert("부끄러운 지도자 ... this is water");
    } else if (cell.country !== "North Korea") {
      alert("이건 조국이 아니야 ... this is not the motherland!");
    } else {
      fetch(`http://localhost:3001/players`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ x_coord: xCoord, y_coord: yCoord })
      });

      this.setHidingSpot(parseInt(cell.id));
      alert("glorious hiding spot");
    }
  };

  setHidingSpot = id => {
    fetch(`http://localhost:3001/grid_squares/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        grid_square: {
          has_player: true
        }
      })
    });
    this.props.startGame();
  };

  render() {
    return (
      <table>
        <tbody>
          <MapGrid
            gridsquares={this.props.gridsquares}
            handleClick={
              this.props.startScreen ? this.onClickStart : this.handleClick
            }
            activePlayer={this.props.activePlayer}
          />
        </tbody>
      </table>
    );
  }
}

export default MapContainer;
