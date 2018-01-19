import React from "react";
import MapGrid from "./MapGrid";
import styles from "./style/MapContainer.css";

class MapContainer extends React.Component {
<<<<<<< HEAD
  constructor(props) {
    super(props)

    this.state = {
      activePlayer: 1
    }
  }

  handleClick = (cell) => {
    let gridsquareId = cell.id
=======
  constructor() {
    super();

    this.state = {
      gridsquares: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:3001/grid_squares")
      .then(resp => resp.json())
      .then(gridsquares => this.setMap(gridsquares));
  }

  setMap(gridsquares) {
    const side = Math.sqrt(gridsquares.length);
    const range = [...Array(side).keys()];
    const output = [];

    console.log(range);

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
  }

  handleClick = cell => {
    let gridsquareId = cell.id;

    let flipper = cell.shot === true ? false : true;
>>>>>>> jon

    fetch(`http://localhost:3001/grid_squares/${gridsquareId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ shot: flipper })
    })
<<<<<<< HEAD
      .then((resp) => resp.json())
      .then((gridsquare) => this.updateGridsquare(gridsquare))

    // changeTurn()
  }
  //
  // changeTurn = () => {
  //   let playerId = this.state.activePlayer
  //
  //   fetch(`http://localhost:3001/players/${playerId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({ turn: false })
  //   })
  //
  //   fetch(`http://localhost:3001/players/${otherPlayerId}`, {
  //     method: "PATCH",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json"
  //     },
  //     body: JSON.stringify({ turn: true })
  //   })
  //
  //   this.setState({ activePlayer: otherPlayerId })
  // }
=======
      .then(resp => resp.json())
      .then(gridsquare => this.updateGridsquare(gridsquare));
  };
>>>>>>> jon

  updateGridsquare(gridsquare) {
    const rowIndex = gridsquare.y_coord - 1;
    const columnIndex = gridsquare.x_coord - 1;

    let localGridsquares = this.state.gridsquares;
    localGridsquares[rowIndex][columnIndex].shot =
      localGridsquares[rowIndex][columnIndex].shot === true ? false : true;

    this.setState({ gridsquares: localGridsquares });
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <table>
          <tbody>
            <MapGrid
              gridsquares={this.props.gridsquares}
              handleClick={this.handleClick}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default MapContainer;
