import { SerializedCard } from "./../types/types";
import { Face } from "./../enums/Face";
import { Suit } from "../enums/Suit";
import Serializable from "../interfaces/Serializable";
import CardInterface from "../interfaces/CardInterface";

class Card implements CardInterface, Serializable {
  private _face: Face;
  private _suit: Suit;
  private _values: number[];

  constructor(face: Face, suit: Suit, values: number[]) {
    this._face = face;
    this._suit = suit;
    this._values = values;
  }

  public get suit() {
    return this._suit;
  }

  public get face() {
    return this._face;
  }

  public get values() {
    return this._values;
  }

  public serialize(): SerializedCard {
    return { suit: this._suit, face: this._face };
  }
}

export default Card;
