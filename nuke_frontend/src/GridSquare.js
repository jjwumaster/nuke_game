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
      high: "#0099ff",
      medium: "#33ccff",
      low: "#66ccff",
      zero: "#99ccff"
    },
    Russia: {
      high: "#009933",
      medium: "#33cc33",
      low: "#66ff66",
      zero: "#99ff99"
    },
    Japan: {
      high: "#009933",
      medium: "#33cc33",
      low: "#66ff66",
      zero: "#99ff99"
    },
    China: {
      high: "#ff5050",
      medium: "#ff6666",
      low: "#ff9999",
      zero: "#ffcccc"
    },
    Water: {
      high: "teal",
      medium: "teal",
      low: "teal",
      zero: "teal"
    }
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
      return countryColors[cell.country][cell.density];
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
        id={`cell-${cell.x_coord}-${cell.y_coord}`}
      />
    );
  });
};

export default GridSquare;
