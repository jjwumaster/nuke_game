import React from "react"
import MapGrid from "./MapGrid"
import styles from "./style/MapContainer.css"

class MapContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePlayer: 2
    }
  }

  handleClick = (cell) => {
    let gridsquareId = cell.id

    let flipper = cell.shot === true ? false : true

    fetch(`http://localhost:3001/grid_squares/${gridsquareId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ shot: flipper })
    })
      .then((resp) => resp.json())
      .then((gridsquare) => this.updateGridsquare(gridsquare))

    // changeTurn()
  }

  updateGridsquare(gridsquare) {
    const rowIndex = gridsquare.y_coord - 1
    const columnIndex = gridsquare.x_coord - 1

    let localGridsquares = this.state.gridsquares
    localGridsquares[rowIndex][columnIndex].shot =
      localGridsquares[rowIndex][columnIndex].shot === true ? false : true

    this.setState({ gridsquares: localGridsquares })
  }

  render() {
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
    )
  }
}

export default MapContainer
