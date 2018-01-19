import React from "react";
import "./style/GridSquare.css";

const GridSquare = props => {
  const countryColors = {
    "North Korea": "pink",
    "South Korea": "blue",
    Japan: "white",
    China: "yellow"
  };

  const setColor = cell => {
    if (cell.has_player === true && props.activePlayer === 1) {
      return "purple";
    } else if (!cell.land) {
      return "teal";
    } else if (cell.shot) {
      return "black";
    } else {
      // return the color in accordance with the country
      return countryColors[cell.country];
    }
  };

  return props.row.map(cell => {
    const style = {
      backgroundColor: setColor(cell)
    };

    return (
      <td
        key={`cell-${cell.id}`}
        style={style}
        onClick={() => props.handleClick(cell)}
        className="gridsquare"
      />
    );
  });
};

export default GridSquare;
