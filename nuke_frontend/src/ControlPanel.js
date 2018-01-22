import React from "react";
import WeaponSelector from "./WeaponSelector";
import CurrentWeapon from "./CurrentWeapon";

const ControlPanel = props => {
  return (
    <div>
      <h1>Player {props.activePlayer} turn</h1>
      <WeaponSelector />
      <CurrentWeapon />
    </div>
  );
};

export default ControlPanel;
