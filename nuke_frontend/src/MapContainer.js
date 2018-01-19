import React from "react"
import MapGrid from "./MapGrid"

class MapContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      gridsquares: [],
      activePlayer: 1
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

  updateGridsquare(gridsquare) {
    const rowIndex = gridsquare.y_coord - 1
    const columnIndex = gridsquare.x_coord - 1
    const replace = this.state.gridsquares[rowIndex][columnIndex]

    this.state.gridsquares[rowIndex].splice(columnIndex, 1)
    this.setState({ gridsquares: [...this.state.gridsquares] })
  }

  render() {
    return (
      <div>
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
