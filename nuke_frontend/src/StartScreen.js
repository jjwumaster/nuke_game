import React from "react";
import MapGrid from "./MapGrid";
import "./style/StartScreen.css";

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

class StartScreen extends React.Component {
  onClickStart = cell => {
    const xCoord = cell.x_coord;
    const yCoord = cell.y_coord;

    if (!cell.land) {
      alert("부끄러운 지도자 ... this is water");
    } else if (cell.country !== "North Korea") {
      alert("이건 조국이 아니야 ... this is not the motherland!");
    } else {
      fetch(`http://localhost:3001/players`, {
        method: "POST",
        headers: HEADERS,
        body: JSON.stringify({ x_coord: xCoord, y_coord: yCoord })
      });

      this.setHidingSpot(parseInt(cell.id));
      this.props.history.push("/play");
    }
  };

  setHidingSpot = id => {
    fetch(`http://localhost:3001/grid_squares/${id}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        grid_square: {
          has_player: true
        }
      })
    });
  };

  createSecondPlayer = () => {
    fetch(`http://localhost:3001/players`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify({
        name: "Player 2"
      })
    });
  };

  render() {
    return (
      <div>
        <i>
          <h1>DEFEAT USA CAPITALIST PIGS</h1>
        </i>
        <h2>영광스러운 지도자 김종운</h2>
        <h2>Select Your Hiding Position</h2>
        <table>
          <tbody>
            <MapGrid
              gridsquares={this.props.gridsquares}
              handleClick={this.onClickStart}
            />
          </tbody>
        </table>
      </div>
    );
  }
}
export default StartScreen;
