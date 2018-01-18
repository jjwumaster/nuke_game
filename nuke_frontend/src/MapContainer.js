import React from "react";
import MapGrid from "./MapGrid";

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

    for (let y of range) {
      output.push([]);
      for (let square in gridsquares) {
        if (gridsquares[square].y_coord === y + 1) {
          output[y].push(gridsquares[square]); // how do we make sure this is is in the right x order
        }
      }
    }

    this.setState({ gridsquares: output });
  }

  render() {
    return (
      <div>
        <h1> Hi </h1>
        <table>
          <tbody>
            <MapGrid gridsquares={this.state.gridsquares} />
          </tbody>
        </table>
      </div>
    );
  }
}

export default MapContainer;
