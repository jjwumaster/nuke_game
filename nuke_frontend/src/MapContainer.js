import React from "react";
import MapGrid from "./MapGrid";
import styles from "./style/MapContainer.css";

class MapContainer extends React.Component {
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

    fetch(`http://localhost:3001/grid_squares/${gridsquareId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ shot: flipper })
    })
      .then(resp => resp.json())
      .then(gridsquare => this.updateGridsquare(gridsquare));
  };

  updateGridsquare(gridsquare) {
    const rowIndex = gridsquare.y_coord - 1;
    const columnIndex = gridsquare.x_coord - 1;

    let localGridsquares = this.state.gridsquares;
    localGridsquares[rowIndex][columnIndex].shot =
      localGridsquares[rowIndex][columnIndex].shot === true ? false : true;

    this.setState({ gridsquares: localGridsquares });
  }

  render() {
    return (
      <div>
        <h1> Hi </h1>
        <table>
          <tbody>
            <MapGrid
              gridsquares={this.state.gridsquares}
              handleClick={this.handleClick}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default MapContainer;
