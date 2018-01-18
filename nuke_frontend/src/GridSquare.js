import React from "react";

const GridSquare = props => {
  return props.row.map(cell => {
    return <td>{cell.id}</td>;
  });
};

export default GridSquare;
