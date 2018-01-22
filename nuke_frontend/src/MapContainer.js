import React from "react"
import MapGrid from "./MapGrid"
import "./style/MapContainer.css"

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

class MapContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      players: [],
      activePlayer: 1
    }
  }

  componentDidMount() {
    fetch(`http://localhost:3001/players`)
      .then((resp) => resp.json())
      .then((players) => this.setState({ players: players }))
  }

  handleClick = (cell) => {
    let gridsquareId = cell.id
    let flipper = cell.shot === true ? false : true

    if (cell.has_player === true && this.state.activePlayer === 2) {
      alert("END GAME")

      this.endGame()
    }

    if (cell.has_player === true && this.state.activePlayer === 1) {
      alert("You idiot!")

      this.endGame()
    }

    fetch(`http://localhost:3001/grid_squares/${gridsquareId}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ shot: flipper })
    })
      .then((resp) => resp.json())
      .then((gridsquare) => this.props.updateGridsquare(gridsquare))

    this.nextTurn()
  }

  nextTurn = () => {
    let nextState = this.state.activePlayer === 1 ? 2 : 1
    this.setState({
      activePlayer: nextState
    })
  }

  endGame = () => {
    fetch(`http://localhost:3001/end/`, {
      method: "PATCH"
    })

    this.props.history.push("/end")
  }

  render() {
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
    )
  }
}

export default MapContainer
