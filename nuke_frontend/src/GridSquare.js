import React from "react";
import "./style/GridSquare.css";

const GridSquare = props => {
  const countryColors = {
    "North Korea": {
      high: "#d2a679",
      medium: "#d2a679",
      low: "#d2a679",
      zero: "#d2a679"
    },
    "South Korea": {
      high: "#800000",
      medium: "#CD0000",
      low: "#FF0000",
      zero: "#FF6A6A"
    },
    Russia: {
      high: "silver",
      medium: "silver",
      low: "silver",
      zero: "silver"
    },
    Japan: {
      high: "silver",
      medium: "silver",
      low: "silver",
      zero: "silver"
    },
    China: {
      high: "silver",
      medium: "silver",
      low: "silver",
      zero: "silver"
    },
    Water: {
      high: "#99ccff",
      medium: "#99ccff",
      low: "#99ccff",
      zero: "#99ccff"
    }
  };

  const setColor = cell => {
    if (cell.targeted === true) {
      return "yellow";
    } else if (cell.has_player === true && props.activePlayer === 1) {
      return "pink";
    } else if (!cell.land) {
      return "#99ccff";
    } else if (cell.shot) {
      return "#39ff14";
    } else {
      // return the color in accordance with the country
      return countryColors[cell.country][cell.density];
    }
  };

  return props.row.map(cell => {
    const style = {
      backgroundColor: setColor(cell)
    };

    // need an onHover that highlights neighboring cells

    return (
      <td
        key={`cell-${cell.id}`}
        style={style}
        onClick={() => props.handleClick(cell)}
        className="gridsquare"
        id={`cell-${cell.x_coord}-${cell.y_coord}`}
        onMouseEnter={() => props.handleHover(cell)}
        onMouseLeave={() => props.handleLeave(cell)}
      />
    );
  });
};

export default GridSquare;
