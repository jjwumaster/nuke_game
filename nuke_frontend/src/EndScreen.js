import React from "react"

class EndScreen extends React.Component {
  handleClick = () => {
    this.props.history.push("/")
  }

  render() {
    return (
      <div>
        <img alt="" src="https://i.imgflip.com/kduan.jpg" />
        <br />
        <button onClick={this.handleClick}>New Game</button>
      </div>
    )
  }
}

export default EndScreen
