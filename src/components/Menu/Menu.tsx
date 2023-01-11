import React, { FC, useState } from "react";
import PlayerKeeper from "../../classes/PlayerKeeper";
import Button from "../Button/Button";
import styles from "./Menu.module.scss";
import Players from "./MenuItems/Players/Players";

interface MenuProps {
  playerKeeper: PlayerKeeper;
  onStart: () => void;
}

const Menu: FC<MenuProps> = ({ playerKeeper, onStart }) => {
  const onClickHandler = () => {
    if (playerKeeper.players.length < 2) return;
    onStart();
  };

  return (
    <div className={styles.Menu}>
      <Players playerKeeper={playerKeeper} />
      <Button onClick={onClickHandler}>Start</Button>
    </div>
  );
};

export default Menu;
