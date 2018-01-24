import React from "react";
import Weapon from "./Weapon";
import CurrentWeapon from "./CurrentWeapon";

const WeaponSelector = props => {
  let currentPlayer = props.players.find(player => {
    return player.player_number === props.activePlayer;
  });

  if (currentPlayer) {
    const weaponsList = currentPlayer.weapons.map((weapon, i) => (
      <div
        key={weapon.id}
        onClick={() => props.handleSelection(weapon)}
        className="ui fluid card"
      >
        <Weapon weapon={weapon} />
      </div>
    ));
    return (
      <div>
        <h3>Weapon Selection</h3>
        <div className="ui three cards">{weaponsList}</div>
        {Object.keys(props.activeWeapon).length === 0 ? null : (
          <div>
            <h3>Active Weapon</h3>
            <CurrentWeapon activeWeapon={props.activeWeapon} />
          </div>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default WeaponSelector;
