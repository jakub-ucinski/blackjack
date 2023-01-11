import React, { FC } from "react";
import PlayerKeeper from "../../classes/PlayerKeeper";
import { useAppSelector } from "../../store";
import { getNameWithApostrophe } from "../../utils/utils";
import Button from "../Button/Button";
import styles from "./GameBoard.module.scss";
import Player from "./Player/Player";

interface GameBoardInterface {
  onMenu: () => void;
  playerKeeper: PlayerKeeper;
  onRestart: () => void;
}

const GameBoard: FC<GameBoardInterface> = ({
  playerKeeper,
  onMenu,
  onRestart,
}) => {
  const turnPlayer = useAppSelector((state) => state.game.turn);
  const restartHandler = () => {
    onRestart();
  };

  return (
    <div className={styles.GameBoard}>
      <div className={styles.TopButtons}>
        <Button onClick={restartHandler}>Restart</Button>
        <Button onClick={onMenu}>Menu</Button>
      </div>
      <div className={styles.Announcements}>
        {turnPlayer && (
          <span>
            It's{" "}
            <span className={styles.Name}>
              {getNameWithApostrophe(turnPlayer.name)}
            </span>{" "}
            turn.
          </span>
        )}
      </div>
      <div className={styles.Players}>
        {playerKeeper.players.map((player) => (
          <Player
            key={player.id}
            player={player}
            isTurn={turnPlayer?.id === player.id}
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
