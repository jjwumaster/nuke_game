import React from "react"
import WeaponSelector from "./WeaponSelector"

class ControlPanel extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      activeWeapon: {}
    }
  }

  handleClick = () => {
    this.props.history.push("/")
    this.setState({ activeWeapon: {} })
    this.props.endGame()
  }

  handleSelection = (weapon) => {
    this.setState({ activeWeapon: weapon })
  }

  render() {
    return (
      <div>
        {this.props.location.pathname === "/end" ? (
          <div>
            <img alt="" src="https://i.imgflip.com/kduan.jpg" />
            <br />
            <button onClick={this.handleClick}>New Game</button>
          </div>
        ) : (
          <div>
            <h1>Player {this.props.activePlayer} turn</h1>
            <WeaponSelector
              players={this.props.players}
              activePlayer={this.props.activePlayer}
              handleSelection={this.handleSelection}
              activeWeapon={this.state.activeWeapon}
            />
          </div>
        )}
      </div>
    )
  }
}

export default ControlPanel
