import React from "react";
import WeaponSelector from "./WeaponSelector";
import CurrentWeapon from "./CurrentWeapon";

const ControlPanel = props => {
  return (
    <div>
      {props.location.pathname === "/end" ? (
        <div>
          <img alt="" src="https://i.imgflip.com/kduan.jpg" />
          <br />
          <button onClick={this.handleClick}>New Game</button>
        </div>
      ) : (
        <div>
          <h1>Player {props.activePlayer} turn</h1>
          <WeaponSelector />
          <CurrentWeapon />
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
