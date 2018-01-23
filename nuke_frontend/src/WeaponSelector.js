import React from "react";
import Weapon from "./Weapon";

const WeaponSelector = props => {
  let currentPlayer = props.players.find(player => {
    return player.player_number === props.activePlayer;
  });

  if (currentPlayer) {
    return currentPlayer.weapons.map(weapon => {
      return (
        <div>
          <Weapon weapon={weapon} />
        </div>
      );
    });
  } else {
    return null;
  }
};

export default WeaponSelector;
