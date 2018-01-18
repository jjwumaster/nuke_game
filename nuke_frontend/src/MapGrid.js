import React from "react"
import GridSquare from "./GridSquare"

const MapGrid = (props) => {
  console.log(props.gridsquares)

  return props.gridsquares.map((row, i) => {
    return (
      <tr key={`row-${i}`}>
        <GridSquare handleClick={props.handleClick} row={row} />
      </tr>
    )
  })
}

export default MapGrid
