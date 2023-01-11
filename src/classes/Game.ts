import { MAX_VALID_SCORE } from "./../constants/game-constants";
import { PlayerDecision } from "../enums/PlayerDecision";
import PlayerInterface from "../interfaces/PlayerInterface";
import ScoresInterface from "../interfaces/ScoresInterface";
import PlayerKeeper from "./PlayerKeeper";
import DeckInterface from "../interfaces/DeckInterface";

class Game {
  private playerKeeper: PlayerKeeper;
  private deck: DeckInterface;

  constructor(playerKeeper: PlayerKeeper, deck: DeckInterface) {
    this.playerKeeper = playerKeeper;
    this.deck = deck;
  }

  public run() {
    this.init();
    this.gameloop();
  }

  private init() {
    this.deck.shuffle();
    for (const player of this.playerKeeper.players) {
      try {
        player.receiveCard(this.deck.getTopCard());
        player.receiveCard(this.deck.getTopCard());
        if (player.hand.getPossibleCardValues().includes(MAX_VALID_SCORE)) {
          // Don't ask user for further options is they are at 21
          player.out();
        }
      } catch (e) {
        this.noCardsHandler();
      }
    }
  }

  private async gameloop() {
    let removedPlayersCount = this.playerKeeper.players.reduce(
      (removedCount, curr) => (curr.isIn() ? removedCount : removedCount + 1),
      0
    );
    let maxScore = 0;
    while (this.playerKeeper.players.length > removedPlayersCount) {
      for (const player of this.playerKeeper.players) {
        if (!player.isIn()) continue;

        const decision = await player.getDecision(this.deck);

        if (decision === PlayerDecision.HIT) {
          this.hit(player);
        } else if (decision === PlayerDecision.STAND) {
          this.stand(player);
        }
        maxScore = Math.max(maxScore, player.gameScore);
        if (!player.isIn()) {
          removedPlayersCount++;
        }

        if (this.playerKeeper.players.length - removedPlayersCount <= 1) {
          for (const player of this.playerKeeper.players) {
            player.isIn() &&
              player.gameScore > maxScore &&
              ++removedPlayersCount &&
              player.out();
          }
          if (this.playerKeeper.players.length === removedPlayersCount) break;
        }
      }
    }
  }

  private hit(player: PlayerInterface) {
    try {
      player.receiveCard(this.deck.getTopCard());
      if (player.isBust()) player.out();
      if (player.hand.getPossibleCardValues().includes(MAX_VALID_SCORE)) {
        // Don't ask user for further options is they are at 21
        player.out();
      }
    } catch (e) {
      this.noCardsHandler();
    }
  }

  private stand(player: PlayerInterface) {
    player.out();
  }

  private noCardsHandler() {
    console.log("run out of cards");
    for (const player of this.playerKeeper.players) {
      player.isIn() && player.out();
    }
  }

  public reset() {
    for (const player of this.playerKeeper.players) {
      player.reset();
    }
    this.deck.reset();
  }
}

export default Game;
