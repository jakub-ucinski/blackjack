import React, { FC } from "react";
import { PlayerDecision } from "../../../../../enums/PlayerDecision";
import HumanPlayer from "../../../../../classes/Player/HumanPlayer";
import DecisionEventDetail from "../../../../../events/DecisionEventDetail";
import PlayerInterface from "../../../../../interfaces/PlayerInterface";
import styles from "./Player.module.scss";

import Button from "../../../../Button/Button";
import PlayerKeeper from "../../../../../classes/PlayerKeeper";
import { FaRobot } from "react-icons/fa";
import { BsFillPersonFill } from "react-icons/bs";
import { SerializedPlayer } from "../../../../../types/types";

interface PlayerProps {
  player: SerializedPlayer;
  playerKeeper: PlayerKeeper;
  onRemove: (playerId: string) => void;
}

const Player: FC<PlayerProps> = ({ player, onRemove }) => {
  const removeHandler = () => {
    onRemove(player.id);
  };

  const isHuman = player.instance === "HUMAN";
  
  return (
    <div className={styles.Player}>
      <div className={styles.Left}>
        <div className={styles.Icon}>
          {!isHuman && <FaRobot />}
          {isHuman && <BsFillPersonFill />}
        </div>
        <div className={styles.Name}>{player.name}</div>
      </div>
      <div className={styles.Right}>
        <Button onClick={removeHandler}>X</Button>
      </div>
    </div>
  );
};

export default Player;
