import React, { FC, useState } from "react";
import AIPlayer from "../../../../classes/Player/AIPlayer";
import HumanPlayer from "../../../../classes/Player/HumanPlayer";
import PlayerKeeper from "../../../../classes/PlayerKeeper";
import Button from "../../../Button/Button";
import HumanPlayerInput from "./HumanPlayerInput/HumanPlayerInput";
import Player from "./Player/Player";
import styles from "./Players.module.scss";
import { useAppSelector } from "../../../../store";
import { usePlayerCallbacks } from "../../../../hooks/usePlayerCallbacks";

interface PlayersProps {
  playerKeeper: PlayerKeeper;
}

const getErrorMessage = (playersCount: number) => {
  switch (playersCount) {
    case 0:
      return "Please add at least 2 players.";
    case 1:
      return "Please add 1 more player.";
    default:
      return "";
  }
};

const Players: FC<PlayersProps> = ({ playerKeeper }) => {
  const players = useAppSelector((state) => state.players);
  const [playersError, setPlayersError] = useState<string>(
    getErrorMessage(playerKeeper.players.length)
  );
  const playerCallbacks = usePlayerCallbacks();

  const setError = () => {
    setPlayersError(getErrorMessage(playerKeeper.players.length));
  };

  const removeHandler = (playerId: string) => {
    playerKeeper.deregister(playerId);
    setError();
  };

  const addHumanPlayerHandler = (name: string) => {
    if (name.length <= 0) return;
    playerKeeper.register(new HumanPlayer(name, { ...playerCallbacks }));
    setError();
  };
  const addAIPlayerHandler = () => {
    playerKeeper.register(new AIPlayer({ ...playerCallbacks }));
    setError();
  };

  return (
    <div className={styles.Players}>
      <div className={styles.PlayerInputs}>
        <HumanPlayerInput onAdd={addHumanPlayerHandler} />
        <Button onClick={addAIPlayerHandler}>Add AI Player</Button>
      </div>
      {Object.keys(players).map((playerId) => (
        <Player
          key={players[playerId].player.id}
          player={players[playerId].player}
          playerKeeper={playerKeeper}
          onRemove={removeHandler}
        />
      ))}
      {playersError && <p>{playersError}</p>}
    </div>
  );
};
export default Players;
