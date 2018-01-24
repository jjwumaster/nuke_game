import React from "react";

const Weapon = props => {
  return (
    <div>
      {props.weapon.name}
      <ul>
        <li>Remaining Inventory: {props.weapon.shots}</li>
        <li>Reliability: {props.weapon.success_rate * 100}%</li>
      </ul>
    </div>
  );
};

export default Weapon;
