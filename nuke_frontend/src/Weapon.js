import React from "react";

const Weapon = props => {
  return (
    <div>
      {props.weapon.name}
      {props.weapon.description}
      : {props.weapon.shots}
    </div>
  );
};

export default Weapon;
