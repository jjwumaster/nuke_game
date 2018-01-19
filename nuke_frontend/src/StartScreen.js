import React from "react"

class StartScreen extends React.Component {
  constructor() {
    super()

    this.state = {
      activePlayer: 2
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
          <button>Submit</button>
        </form>
      </div>
    )
  }
}
export default StartScreen
