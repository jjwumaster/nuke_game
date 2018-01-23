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
  }

  componentDidMount() {
    fetch(`http://localhost:3001/players`)
      .then((resp) => resp.json())
      .then((players) => this.setState({ players: players }))
  }

  handleClick = (cell) => {
    let gridsquareId = cell.id

    if (cell.has_player === true && this.props.activePlayer === 2) {
      alert("END GAME")

      this.endGame()
    } else if (cell.has_player === true && this.props.activePlayer === 1) {
      alert("You idiot!")

      this.endGame()
    } else if (cell.country === "Water") {
      alert("Can't bomb water!")
    } else {
      let activePlayerName =
        this.props.activePlayer === 1 ? "Donald J Trump" : "Kim Jong Un"
      alert(`Successful bombing run! ${activePlayerName}'s turn!`)
    }

    fetch(`http://localhost:3001/grid_squares/${gridsquareId}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({ shot: true })
    })
      .then((resp) => resp.json())
      .then((gridsquare) => this.props.updateShot(gridsquare))

    this.props.nextTurn()
  }

  endGame = () => {
    fetch("http://localhost:3001/end/", {
      method: "PATCH"
    })
    this.props.history.push("/end")
  }

  onClickStart = (cell) => {
    const xCoord = cell.x_coord
    const yCoord = cell.y_coord

    if (!cell.land) {
      alert("부끄러운 지도자 ... this is water")
    } else if (cell.country !== "North Korea") {
      alert("이건 조국이 아니야 ... this is not the motherland!")
    } else {
      fetch(`http://localhost:3001/players`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ x_coord: xCoord, y_coord: yCoord })
      })

      this.setHidingSpot(cell)
      alert("glorious hiding spot")
    }
  }

  setHidingSpot = (cell) => {
    let cellId = cell.id
    fetch(`http://localhost:3001/grid_squares/${cellId}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        grid_square: {
          has_player: true
        }
      })
    })
    this.props.updateHidingSpot(cell)
    this.props.startGame()
  }

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
    )
  }
}

export default MapContainer
