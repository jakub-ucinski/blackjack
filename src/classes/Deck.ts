import { FACES } from "./../enums/Face";
import { SUITS } from "./../enums/Suit";
import * as _ from "lodash";
import CardProvider from "./CardProvider";
import DeckInterface from "../interfaces/DeckInterface";
import CardInterface from "../interfaces/CardInterface";

class Deck implements DeckInterface {
  private _cards: CardInterface[];
  private _cardProvider: CardProvider;

  public constructor(cardProvider: CardProvider) {
    this._cards = FACES.flatMap((face) =>
      SUITS.map((suit) => cardProvider.getCard(face, suit))
    );
    this._cardProvider = cardProvider;
  }

  public shuffle() {
    this._cards = _.shuffle(this._cards);
  }

  public getTopCard() {
    if (this.isEmpty()) throw Error("InvalidStateException");
    return this._cards.pop()!;
  }

  public isEmpty() {
    return this._cards.length === 0;
  }

  public get cards() {
    return [...this._cards];
  }

  public reset() {
    this._cards = FACES.flatMap((face) =>
      SUITS.map((suit) => this._cardProvider.getCard(face, suit))
    );
  }
}

export default Deck;
