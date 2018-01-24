import React from "react";
import WeaponSelector from "./WeaponSelector";
import CiviliansKilled from "./CiviliansKilled";

const ControlPanel = props => {
  const handleClick = () => {
    props.history.push("/");
    props.resetGame();
  };

  const findPlayer = activePlayer => {
    return props.players.find(player => player.player_number === activePlayer);
  };

  let currentPlayer = findPlayer(props.activePlayer)
    ? findPlayer(props.activePlayer)
    : null;

  let currentName = currentPlayer ? currentPlayer.name : null;
  let currentDescription = currentPlayer ? currentPlayer.description : null;
  let currentFlag = currentPlayer ? currentPlayer.flag : null;

  return (
    <div>
      {props.location.pathname === "/end" ? (
        <div>
          <img alt="" src="https://i.imgflip.com/kduan.jpg" />
          <br />
          <button onClick={() => handleClick()}>New Game</button>
        </div>
      ) : (
        <div>
          <div>
            <h1>
              Current Actor: {currentName} {currentFlag}
            </h1>
            <h2>
              <i>{currentDescription}</i>
            </h2>
          </div>
          <div>
            <CiviliansKilled civiliansKilled={props.civiliansKilled} />
            <br />
            <WeaponSelector
              players={props.players}
              activePlayer={props.activePlayer}
              handleSelection={props.handleSelection}
              activeWeapon={props.activeWeapon}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlPanel;
