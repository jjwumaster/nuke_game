import React from "react";
import GridSquare from "./GridSquare";

const MapGrid = props => {
  console.log(props.gridsquares);

  return props.gridsquares.map(row => {
    return (
      <tr>
        <GridSquare row={row} />
      </tr>
    );
  });
};

export default MapGrid;
