import React from "react";
import Weapon from "./Weapon";

const WeaponSelector = props => {
  let currentPlayer = props.players.find(player => {
    return player.player_number === props.activePlayer;
  });

  console.log(currentPlayer);

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

// {props.weapons.map((weapon) => ( <div>weapon.name</div> )}
