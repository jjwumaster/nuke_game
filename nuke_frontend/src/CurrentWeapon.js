import React from "react"

const CurrentWeapon = (props) => {
  return (
    <div>
      {props.activeWeapon.name}
      <ul>
        <li>{props.activeWeapon.description}</li>
        <li>Shots Remaining: {props.activeWeapon.shots}</li>
      </ul>
    </div>
  )
}

export default CurrentWeapon
