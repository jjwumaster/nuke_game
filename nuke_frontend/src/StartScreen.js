import React from "react"
import MapGrid from "./MapGrid"

class StartScreen extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activePlayer: 1
    }
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
  }

  render() {
    return (
      <div>
        <h1>Nuke Game</h1>
        {this.state.activePlayer === 1 ? (
          <h2>Player 1: </h2>
        ) : (
          <h2>Player 2: </h2>
        )}
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder={"Name"} />
          <h2>Select Starting Position: </h2>
          <MapGrid gridsquares={this.props.gridsquares} />
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
export default StartScreen
