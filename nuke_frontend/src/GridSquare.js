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
      zero: "#F0F8FF"
    },
    Russia: {
      high: "red",
      medium: "red",
      low: "red",
      zero: "red"
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
      high: "#99ccff",
      medium: "#99ccff",
      low: "#99ccff",
      zero: "#99ccff"
    }
  };

  const setColor = cell => {
    if (cell.targeted === true) {
      return "purple";
    } else if (cell.has_player === true && props.activePlayer === 1) {
      return "pink";
    } else if (!cell.land) {
      return "#99ccff";
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
