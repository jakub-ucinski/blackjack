import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./App.module.scss";
import CardProvider from "./classes/CardProvider";
import Deck from "./classes/Deck";
import Game from "./classes/Game";
import PlayerKeeper from "./classes/PlayerKeeper";
import GameBoard from "./components/GameBoard/GameBoard";
import Menu from "./components/Menu/Menu";
import PlayerInterface from "./interfaces/PlayerInterface";
import { useAppDispatch } from "./store";
import { playersActions } from "./store/players-reducer";

const deck = new Deck(new CardProvider());

function App() {
  const [isGame, setIsGame] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const playerKeeperRef = useRef<PlayerKeeper>();
  const gameRef = useRef<Game>();
  const dispatch = useAppDispatch();

  const onPlayerRegister = useCallback(
    (player: PlayerInterface) => {
      dispatch(playersActions.addPlayer(player.serialize()));
    },
    [dispatch]
  );

  const onPlayerDeregister = useCallback(
    (playerId: string) => {
      dispatch(playersActions.removePlayer(playerId));
    },
    [dispatch]
  );

  useEffect(() => {
    playerKeeperRef.current = new PlayerKeeper({
      onPlayerRegister,
      onPlayerDeregister,
    });
    gameRef.current = new Game(playerKeeperRef.current, deck);
    setIsLoaded(true);
  }, [onPlayerDeregister, onPlayerRegister]);

  const runHandler = useCallback(() => {
    gameRef.current?.run();
  }, []);

  useEffect(() => {
    isGame && runHandler();
  }, [isGame, runHandler]);

  const onStartHandler = () => {
    setIsGame(true);
  };

  const reset = () => {
    gameRef.current?.reset();
  };

  const restartHandler = () => {
    reset();
    runHandler();
  };

  return (
    <div className={styles.App}>
      <div className={styles.Logo}>
        {"BLACKJACK".split("").map((letter, index) => (
          <span key={index} className={styles.LogoLetter}>
            {letter}
          </span>
        ))}
      </div>
      {!isLoaded && <p>Loading...</p>}
      {!isGame && playerKeeperRef.current && (
        <Menu playerKeeper={playerKeeperRef.current} onStart={onStartHandler} />
      )}
      {isGame && playerKeeperRef.current && (
        <GameBoard
          playerKeeper={playerKeeperRef.current}
          onRestart={restartHandler}
          onMenu={() => {
            setIsGame(false);
            reset();
          }}
        />
      )}
    </div>
  );
}

export default App;
