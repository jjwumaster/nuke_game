import React from "react";
import GridSquare from "./GridSquare";
import "./style/MapGrid.css";

const MapGrid = props => {
  return props.gridsquares.map((row, i) => {
    return (
      <tr key={`row-${i}`}>
        <GridSquare
          handleClick={props.handleClick}
          row={row}
          activePlayer={props.activePlayer}
          handleHover={props.handleHover}
          handleLeave={props.handleLeave}
        />
      </tr>
    );
  });
};

export default MapGrid;
