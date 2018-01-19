import React from "react";
import GridSquare from "./GridSquare";
import styles from "./style/MapGrid.css";

const MapGrid = props => {
  return props.gridsquares.map((row, i) => {
    return (
      <tr key={`row-${i}`}>
        <GridSquare handleClick={props.handleClick} row={row} />
      </tr>
    );
  });
};

export default MapGrid;
