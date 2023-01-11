import { MAX_VALID_SCORE } from "../constants/game-constants";
import CardInterface from "../interfaces/CardInterface";
import HandInterface from "../interfaces/HandInterface";
import Serializable from "../interfaces/Serializable";
import { SerializedHand } from "../types/types";

class Hand implements HandInterface, Serializable {
  private _cards: CardInterface[];
  private _possibleCardValues: number[];

  constructor() {
    this._cards = [];
    this._possibleCardValues = [0];
  }

  public addCard(card: CardInterface) {
    this._cards.push(card);
    const seen = new Set();
    let filtered = 0;
    this._possibleCardValues = this._possibleCardValues
      .flatMap((val) => card.values.map((cval) => val + cval))
      .sort((a, b) => b - a)
      .filter((val, _, arr) => {
        return (
          arr.length - filtered < 2 || val <= MAX_VALID_SCORE || !++filtered
        );
      })
      .filter((val) => {
        return !seen.has(val) && seen.add(val);
      })
      .sort();
  }

  public get cards() {
    return this._cards;
  }

  public getPossibleCardValues() {
    return this._possibleCardValues;
  }

  public serialize(): SerializedHand {
    return { cards: this.cards.map((card) => card.serialize()) };
  }
}

export default Hand;
