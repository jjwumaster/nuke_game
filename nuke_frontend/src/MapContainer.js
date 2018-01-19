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
  };

  // updateGridsquare(gridsquare) {
  //   const rowIndex = gridsquare.y_coord - 1;
  //   const columnIndex = gridsquare.x_coord - 1;
  //
  //   let localGridsquares = props.gridsquares;
  //   localGridsquares[rowIndex][columnIndex].shot =
  //     localGridsquares[rowIndex][columnIndex].shot === true ? false : true;
  //
  //   this.setState({ gridsquares: localGridsquares });
  // }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <MapGrid
              gridsquares={this.props.gridsquares}
              handleClick={this.handleClick}
              activePlayer={this.state.activePlayer}
            />
          </tbody>
        </table>
      </div>
    );
  }
}

export default MapContainer;
