import React from "react"
import Weapon from "./Weapon"
import CurrentWeapon from "./CurrentWeapon"

const WeaponSelector = (props) => {
  let currentPlayer = props.players.find((player) => {
    return player.player_number === props.activePlayer
  })

  if (currentPlayer) {
    const weaponsList = currentPlayer.weapons.map((weapon) => (
      <div key={weapon.id} onClick={() => props.handleSelection(weapon)}>
        <Weapon weapon={weapon} />
      </div>
    ))
    return (
      <div>
        <h3>Weapon Selection</h3>
        {weaponsList}
        {props.activeWeapon ? (
          <div>
            <h3>Active Weapon</h3>
            <CurrentWeapon activeWeapon={props.activeWeapon} />
          </div>
        ) : null}
      </div>
    )
  } else {
    return null
  }
}

export default WeaponSelector
