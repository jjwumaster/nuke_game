import React from "react"
import MapGrid from "./MapGrid"

class MapContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePlayer: 1
    }
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
    )
  }
}

export default MapContainer
