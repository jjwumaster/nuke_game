import React from "react"

const GridSquare = (props) => {
  return props.row.map((cell) => {
    return (
      <td key={`cell-${cell.id}`} onClick={() => props.handleClick(cell)}>
        {cell.id}
      </td>
    )
  })
}

export default GridSquare
