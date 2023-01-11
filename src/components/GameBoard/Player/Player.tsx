import React, { FC } from "react";
import HumanPlayer from "../../../classes/Player/HumanPlayer";
import PlayerInterface from "../../../interfaces/PlayerInterface";
import { useAppSelector } from "../../../store";
import styles from "./Player.module.scss";
import PlayerCards from "./PlayerCards/PlayerCards";
import { BsFillPersonFill } from "react-icons/bs";
import { FaRobot } from "react-icons/fa";
import PlayerValues from "./PlayerValues/PlayerValues";
import DecisionButtons from "./DecisionButtons/DecisionButtons";
import { getNameWithApostrophe } from "../../../utils/utils";

interface PlayerProps {
  player: PlayerInterface;
  isTurn: boolean;
}

const Player: FC<PlayerProps> = ({ player, isTurn }) => {
  const playerSlice = useAppSelector((state) => state.players[player.id]);
  const isHuman = player instanceof HumanPlayer;

  return (
    <div className={styles.Player}>
      {player.isBust() && (
        <div className={styles.Overlay}>{player.name} is BUST!</div>
      )}
      {!player.isBust() && playerSlice.finalRoundScore && (
        <div className={styles.Overlay}>
          {getNameWithApostrophe(playerSlice.player.name)} score is{" "}
          {playerSlice.finalRoundScore}
        </div>
      )}
      <div className={styles.Name}>
        <div className={styles.Icon}>
          {!isHuman && <FaRobot />}
          {isHuman && <BsFillPersonFill />}
        </div>
        <h2>{player.name}</h2>
      </div>
      <PlayerCards cards={playerSlice.cards} />
      <PlayerValues possibleValues={player.hand.getPossibleCardValues()} />
      {isTurn && isHuman && <DecisionButtons player={player} />}
    </div>
  );
};
export default Player;
