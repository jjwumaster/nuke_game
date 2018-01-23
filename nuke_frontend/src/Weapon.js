import React from "react"

const Weapon = (props) => {
  return (
    <div>
      {props.weapon.name}
      <ul>
        <li>{props.weapon.description}</li>
        <li>Shots Remaining: {props.weapon.shots}</li>
      </ul>
    </div>
  )
}

export default Weapon
