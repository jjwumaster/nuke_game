import React from "react"
import MapGrid from "./MapGrid"

class MapContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      gridsquares: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:3001/grid_squares")
      .then((resp) => resp.json())
      .then((gridsquares) => this.setMap(gridsquares))
  }

  setMap(gridsquares) {
    const side = Math.sqrt(gridsquares.length)
    const range = [...Array(side).keys()]
    const output = []

    for (let y of range) {
      output.push([])
      for (let square in gridsquares) {
        if (gridsquares[square].y_coord === y + 1) {
          output[y].push(gridsquares[square])
        }
      }
    }

    this.setState({ gridsquares: output })
  }

  handleClick = (cell) => {
    let gridsquareId = cell.id
    fetch(`http://localhost:3001/grid_squares/${gridsquareId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ shot: true })
    })
      .then((resp) => resp.json())
      .then((gridsquare) => this.updateGridsquare(gridsquare))
  }
  //
  // updateGridsquare(gridsquare) {
  //   const rowIndex = gridsquare.y_coord - 1
  //   const columnIndex = gridsquare.x_coord - 1
  //
  //   console.log(this.state.gridsquares[rowIndex][columnIndex])
  // }

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
    )
  }
}

export default MapContainer
