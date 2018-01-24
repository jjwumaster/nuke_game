import React from "react";
import WeaponSelector from "./WeaponSelector";
import CiviliansKilled from "./CiviliansKilled";
import CurrentWeapon from "./CurrentWeapon";

const ControlPanel = props => {
  const handleClick = () => {
    props.history.push("/");
    props.resetGame();
  };

  return (
    <div>
      {props.location.pathname === "/end" ? (
        <div>
          <img alt="" src="https://i.imgflip.com/kduan.jpg" />
          <br />
          <button onClick={() => handleClick()}>New Game</button>
        </div>
      ) : (
        <div>
          <h1>Player {props.activePlayer} turn</h1>
          <CiviliansKilled civiliansKilled={props.civiliansKilled} />
          <br />
          <WeaponSelector
            players={props.players}
            activePlayer={props.activePlayer}
            handleSelection={props.handleSelection}
            activeWeapon={props.activeWeapon}
          />
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
