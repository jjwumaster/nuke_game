import React from "react"
import GridSquare from "./GridSquare"

class MapContainer extends React.Component {
  constructor() {
    super()

    this.state = {
      gridsquares: [
        { name: "square1" },
        { name: "square2" },
        { name: "square3" },
        { name: "square4" }
      ]
    }
  }
  render() {
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
