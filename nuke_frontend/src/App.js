import React from "react"
import { Route, withRouter } from "react-router-dom"
import StartScreen from "./StartScreen"
import MapContainer from "./MapContainer"
import EndScreen from "./EndScreen"

class App extends React.Component {
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

  setMap = (gridsquares) => {
    const side = Math.sqrt(gridsquares.length)
    const range = [...Array(side).keys()]
    const output = []

    for (let y of range) {
      output.push([])

      // need to make rowSquares a hash...

      let rowSquares = gridsquares
        .filter((gridsquare) => {
          return gridsquare["y_coord"] === y + 1
        })
        .sort((a, b) => {
          return a["x_coord"] - b["x_coord"]
        })

      for (let square in rowSquares) {
        output[y].push(rowSquares[square])
      }
    }

    this.setState({ gridsquares: output })
  }

  updateGridsquare = (gridsquare) => {
    const rowIndex = gridsquare.y_coord - 1
    const columnIndex = gridsquare.x_coord - 1

    let localGridsquares = this.state.gridsquares
    localGridsquares[rowIndex][columnIndex].shot =
      localGridsquares[rowIndex][columnIndex].shot === true ? false : true

    this.setState({ gridsquares: localGridsquares })
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <StartScreen gridsquares={this.state.gridsquares} {...this.props} />
          )}
        />
        <Route
          exact
          path="/play"
          render={() => (
            <MapContainer
              gridsquares={this.state.gridsquares}
              updateGridsquare={this.updateGridsquare}
              {...this.props}
            />
          )}
        />
        <Route exact path="/end" component={EndScreen} {...this.props} />
      </div>
    )
  }
}

export default withRouter(App)
