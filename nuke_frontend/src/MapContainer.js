import React from "react"
import GridSquare from "./GridSquare"

class MapContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      gridsquares: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:3001/grid_squares")
      .then((resp) => resp.json())
      .then((gridsquares) => setMap(gridsquares))
  }

  setMap(gridsquares) {
    const side = Math.sqrt(gridsquares.length)
    const range = [...Array(side).keys()]
    const output = []

    for (let y in range) {
      output.push([])
      for (let x in range) {
        gridsquares.x_coord === x + 1 && gridsquares.y_coord === y + 1
      }
    }

    this.setState({ gridsquares: output })
  }

  render() {
    console.log(this.state)
    return (
      <table>
        <tbody>
          {this.state.gridsquares.map((gridsquare) => (
            <GridSquare gridsquare={gridsquare} key={gridsquare.id} />
          ))}
        </tbody>
      </table>
    )
  }
}

export default MapContainer
