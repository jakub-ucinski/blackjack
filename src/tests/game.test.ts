import { Face } from "../enums/Face";
import CardProvider from "../classes/CardProvider";
import Deck from "../classes/Deck";
import Game from "../classes/Game";
import Hand from "../classes/Hand";
import HumanPlayer from "../classes/Player/HumanPlayer";
import PlayerKeeper from "../classes/PlayerKeeper";
import DecisionEventDetail from "../events/DecisionEventDetail";
import { PlayerDecision } from "../enums/PlayerDecision";
import { Suit } from "../enums/Suit";
import CardInterface from "../interfaces/CardInterface";
import { wait } from "@testing-library/user-event/dist/utils";

const cardProvider = new CardProvider();
const setup = () => {
  const playerKeeper = new PlayerKeeper();
  const game = new Game(playerKeeper, new Deck(cardProvider));
  const TEST1_CARDS: CardInterface[] = [];
  const TEST2_CARDS: CardInterface[] = [];
  const player1 = new HumanPlayer("TEST1", {
    onCardReceive: (_, card) => {
      TEST1_CARDS.push(card);
    },
  });
  const player2 = new HumanPlayer("TEST2", {
    onCardReceive: (_, card) => {
      TEST2_CARDS.push(card);
    },
  });
  playerKeeper.register(player1);
  playerKeeper.register(player2);
  game.run();
  return [player1, player2, TEST1_CARDS, TEST2_CARDS] as const;
};

describe("Given I play a game of blackjack, When I am dealt my opening hand, Then I have two cards", () => {
  const [player1, player2, TEST1_CARDS, TEST2_CARDS] = setup();
  test("Two Cards at Start", () => {
    expect(TEST1_CARDS.length).toBe(player1.hand.cards.length);
    expect(TEST2_CARDS.length).toBe(player2.hand.cards.length);
    expect(TEST1_CARDS.length).toBe(2);
    expect(TEST2_CARDS.length).toBe(2);
  });
});

describe("Given I have a valid hand of cards, When I choose to ‘hit’, Then I receive another card, And my score is updated", () => {
  let [player1, player2, TEST1_CARDS, TEST2_CARDS] = setup();
  while (player1.gameScore >= 21 || player2.gameScore >= 21) {
    [player1, player2, TEST1_CARDS, TEST2_CARDS] = setup();
  }

  const prevScore = player1.gameScore;
  const prevMin = Math.min(...player1.hand.getPossibleCardValues());

  test("Can receive one more card", async () => {
    window.dispatchEvent(
      new CustomEvent<DecisionEventDetail>(`decision-${player1.id}`, {
        detail: { decision: PlayerDecision.HIT },
      })
    );
    await wait(100);
    expect(TEST1_CARDS.length).toBe(player1.hand.cards.length);
    expect(TEST2_CARDS.length).toBe(player2.hand.cards.length);
    expect(TEST1_CARDS.length).toBe(3);
    expect(TEST2_CARDS.length).toBe(2);
  });

  test("Score is increased if it wouldn't lead to a bust score", () => {
    const currMin = Math.min(...player1.hand.getPossibleCardValues());
    const delta = currMin - prevMin;
    const newScore = player1.gameScore;
    expect(newScore > prevScore || prevScore + delta > 21).toBeTruthy();
  });

  test("Other player can receive a card, if the first player is not bust", async () => {
    await wait(100);
    window.dispatchEvent(
      new CustomEvent<DecisionEventDetail>(`decision-${player2.id}`, {
        detail: { decision: PlayerDecision.HIT },
      })
    );
    await wait(100);

    expect(TEST1_CARDS.length).toBe(player1.hand.cards.length);
    expect(TEST2_CARDS.length).toBe(player2.hand.cards.length);
    expect(TEST1_CARDS.length).toBe(3);
    expect(TEST2_CARDS.length === 3 || player1.isBust()).toBeTruthy();
  });
});

describe("Given I have a valid hand of cards, When I choose to ‘stand’, Then I receive no further cards, And my score is evaluated", () => {
  const [player1, player2, TEST1_CARDS, TEST2_CARDS] = setup();
  window.dispatchEvent(
    new CustomEvent<DecisionEventDetail>(`decision-${player1.id}`, {
      detail: { decision: PlayerDecision.STAND },
    })
  );
  test("I receive no further cards", async () => {
    expect(TEST1_CARDS.length).toBe(2);
    expect(TEST2_CARDS.length).toBe(2);
    expect(player1.hand.cards.length).toBe(2);
    expect(player2.hand.cards.length).toBe(2);
  });
});

describe("Player has a valid hand if score is less or equal to 21", () => {
  test("Player has a valid hand if score is 20", async () => {
    const hand = new Hand();
    hand.addCard(cardProvider.getCard(Face.K, Suit.CLUBS));
    hand.addCard(cardProvider.getCard(Face.Q, Suit.DIAMOND));
    const player = new HumanPlayer("TEST", undefined, hand);
    expect(player.gameScore).toBe(20);
    expect(player.isBust()).toBeFalsy();
  });

  test("Player has a valid hand if score is 21", async () => {
    const hand = new Hand();
    hand.addCard(cardProvider.getCard(Face.K, Suit.CLUBS));
    hand.addCard(cardProvider.getCard(Face.A, Suit.DIAMOND));
    const player = new HumanPlayer("TEST", undefined, hand);
    expect(player.gameScore).toBe(21);
    expect(player.isBust()).toBeFalsy();
  });

  test("Player has a valid hand if score is 11", async () => {
    const hand = new Hand();
    hand.addCard(cardProvider.getCard(Face.A, Suit.CLUBS));
    const player = new HumanPlayer("TEST", undefined, hand);
    expect(player.gameScore).toBe(11);
    expect(player.isBust()).toBeFalsy();
  });

  test("Player has a valid hand if score is 2", async () => {
    const hand = new Hand();
    hand.addCard(cardProvider.getCard(Face.N2, Suit.CLUBS));
    const player = new HumanPlayer("TEST", undefined, hand);
    expect(player.gameScore).toBe(2);
    expect(player.isBust()).toBeFalsy();
  });
});

describe("Player is bust when they have a score 22 or higher", () => {
  test("Player is bust when then have a score of 22", () => {
    const hand = new Hand();
    hand.addCard(cardProvider.getCard(Face.K, Suit.CLUBS));
    hand.addCard(cardProvider.getCard(Face.Q, Suit.DIAMOND));
    hand.addCard(cardProvider.getCard(Face.N2, Suit.DIAMOND));
    const player = new HumanPlayer("TEST", undefined, hand);
    expect(player.gameScore).toBe(22);
    expect(player.isBust()).toBeTruthy();
  });

  test("Player is bust when then have a score of 23", () => {
    const hand = new Hand();
    hand.addCard(cardProvider.getCard(Face.K, Suit.CLUBS));
    hand.addCard(cardProvider.getCard(Face.Q, Suit.DIAMOND));
    hand.addCard(cardProvider.getCard(Face.N3, Suit.DIAMOND));
    const player = new HumanPlayer("TEST", undefined, hand);
    expect(player.gameScore).toBe(23);
    expect(player.isBust()).toBeTruthy();
  });
});

test("King, queen and ace is 21", () => {
  const hand = new Hand();
  hand.addCard(cardProvider.getCard(Face.K, Suit.CLUBS));
  hand.addCard(cardProvider.getCard(Face.Q, Suit.DIAMOND));
  hand.addCard(cardProvider.getCard(Face.A, Suit.HEARTS));
  const player1 = new HumanPlayer("TEST1", undefined, hand);
  expect(player1.gameScore).toBe(21);
});

test("Nine, ace and ace is 21", () => {
  const hand = new Hand();
  hand.addCard(cardProvider.getCard(Face.N9, Suit.CLUBS));
  hand.addCard(cardProvider.getCard(Face.A, Suit.HEARTS));
  hand.addCard(cardProvider.getCard(Face.A, Suit.HEARTS));
  const player1 = new HumanPlayer("TEST1", undefined, hand);
  expect(player1.gameScore).toBe(21);
});
