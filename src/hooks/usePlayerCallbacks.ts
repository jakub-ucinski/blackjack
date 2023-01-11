import CardInterface from "../interfaces/CardInterface";
import PlayerInterface from "../interfaces/PlayerInterface";
import { useAppDispatch } from "../store";
import { gameActions } from "../store/game-reducer";
import { playersActions } from "../store/players-reducer";

export const usePlayerCallbacks = () => {
  const dispatch = useAppDispatch();

  const onCardReceive = (player: PlayerInterface, card: CardInterface) => {
    dispatch(
      playersActions.addPlayerCard({
        player: player.serialize(),
        card: card.serialize(),
      })
    );
  };

  const onTurnStart = (player: PlayerInterface) => {
    dispatch(gameActions.setTurn(player.serialize()));
  };

  const onTurnEnd = () => {
    dispatch(gameActions.setTurn(undefined));
  };

  const onOut = (player: PlayerInterface, score: number) => {
    dispatch(
      playersActions.setScore({
        playerId: player.id,
        score,
      })
    );
  };

  const onReset = (player: PlayerInterface) => {
    dispatch(playersActions.reset(player.id));
  };

  return {onCardReceive, onTurnStart, onTurnEnd, onOut, onReset} as const;
};
