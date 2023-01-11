import React, { FC } from "react";
import { PlayerDecision } from "../../../../enums/PlayerDecision";
import DecisionEventDetail from "../../../../events/DecisionEventDetail";
import PlayerInterface from "../../../../interfaces/PlayerInterface";
import Button from "../../../Button/Button";
import styles from "./DecisionButtons.module.scss";

interface DecisionButtonProps {
  player: PlayerInterface;
}

const DecisionButtons: FC<DecisionButtonProps> = ({ player }) => {
  const hitHandler = () => {
    // window.event
    const event = new CustomEvent<DecisionEventDetail>(
      `decision-${player.id}`,
      {
        detail: {
          decision: PlayerDecision.HIT,
        },
      }
    );
    window.dispatchEvent(event);
  };
  const standHandler = () => {
    const event = new CustomEvent<DecisionEventDetail>(
      `decision-${player.id}`,
      {
        detail: {
          decision: PlayerDecision.STAND,
        },
      }
    );
    window.dispatchEvent(event);
  };

  return (
    <div className={styles.Buttons}>
      <Button onClick={hitHandler} className={styles.Button}>
        HIT
      </Button>
      <Button onClick={standHandler} className={styles.Button}>
        STAND
      </Button>
    </div>
  );
};

export default DecisionButtons;
