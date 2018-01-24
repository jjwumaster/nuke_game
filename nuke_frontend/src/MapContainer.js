import React from "react";
import MapGrid from "./MapGrid";
import "./style/MapContainer.css";

const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

class MapContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    let alertMessage = "";
    let weaponId = this.props.activeWeapon.id;
    let shots = this.props.activeWeapon.shots;
    let newShots = shots - 1;

    let targetedSquares = this.props.targetedSquares;

    for (let gridsquare of targetedSquares) {
      let gridsquareId = gridsquare.id;

      if (
        gridsquare.has_player === true &&
        this.props.activePlayer === 2 &&
        weaponId
      ) {
        alertMessage = "GAME OVER! USA WINS! U-S-A! U-S-A! U-S-A!";
        this.endGame();
      } else if (
        gridsquare.has_player === true &&
        this.props.activePlayer === 1 &&
        weaponId
      ) {
        alertMessage = "WE DEFEAT OUR OWN GLORIOUS COUNTRY! NOOOOOOO!!!!!";
        this.endGame();

        // } else if (cell.country === "Water") {
        //   this.setState({alertMessage: "Can't bomb water!"; })
        //
      } else if (!weaponId) {
        alertMessage = "Select your weapon.";
      } else if (weaponId) {
        let activePlayerName =
          this.props.activePlayer === 1 ? "Donald J Trump" : "Kim Jong Un";
        if (!this.props.gameEnded) {
          alertMessage = `Successful bombing run! Now it's ${activePlayerName}'s turn!`;
        }

        fetch(`http://localhost:3001/grid_squares/${gridsquareId}`, {
          method: "PATCH",
          headers: HEADERS,
          body: JSON.stringify({ shot: true })
        })
          .then(resp => resp.json())
          .then(gridsquare => this.props.updateShot(gridsquare));

        this.props.killCivilians();
      }
    }

    if (weaponId) {
      fetch(`http://localhost:3001/weapons/${weaponId}`, {
        method: "PATCH",
        headers: HEADERS,
        body: JSON.stringify({ shots: newShots })
      });

      this.props.nextTurn();
    }

    alert(alertMessage);
  };

  endGame = () => {
    fetch("http://localhost:3001/end/", {
      method: "PATCH"
    });
    this.props.history.push("/end");
  };

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

      this.setHidingSpot(cell);
      alert("glorious hiding spot");
    }
  };

  setHidingSpot = cell => {
    let cellId = cell.id;
    fetch(`http://localhost:3001/grid_squares/${cellId}`, {
      method: "PATCH",
      headers: HEADERS,
      body: JSON.stringify({
        grid_square: {
          has_player: true
        }
      })
    });
    this.props.updateHidingSpot(cell);
    this.props.startGame();
  };

  render() {
    return (
      <table>
        <tbody>
          <MapGrid
            gridsquares={this.props.gridsquares}
            handleClick={
              this.props.startScreen ? this.onClickStart : this.handleClick
            }
            handleHover={this.props.handleHover}
            handleLeave={this.props.handleLeave}
            activePlayer={this.props.activePlayer}
          />
        </tbody>
      </table>
    );
  }
}

export default MapContainer;
