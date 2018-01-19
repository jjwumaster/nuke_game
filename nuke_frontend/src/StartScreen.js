import React from "react"
import MapGrid from "./MapGrid"

class StartScreen extends React.Component {
  constructor(props) {
    super(props)
  }

  onClickStart = (cell) => {
    const xCoord = cell.x_coord
    const yCoord = cell.y_coord
    fetch(`http://localhost:3001/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ x_coord: xCoord, y_coord: yCoord })
    })
      .then((resp) => resp.json())
      .then((player) => console.log(player))
  }

  render() {
    return (
      <div>
        <h1>Nuke Game</h1>
        <h2>North Korea, Select Your Hiding Position</h2>
        <MapGrid
          gridsquares={this.props.gridsquares}
          handleClick={this.onClickStart}
        />
      </div>
    )
  }
}
export default StartScreen
