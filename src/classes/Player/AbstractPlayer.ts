import * as _ from "lodash";
import PlayerInterface from "../../interfaces/PlayerInterface";
import Card from "../Card";
import Hand from "../Hand";
import HandInterface from "../../interfaces/HandInterface";
import { SerializedPlayer } from "./../../types/types";
import { MAX_VALID_SCORE } from "./../../constants/game-constants";
import { PlayerDecision } from "../../enums/PlayerDecision";
import CardInterface from "../../interfaces/CardInterface";
import DeckInterface from "../../interfaces/DeckInterface";

export interface PlayerCallbacks {
  onCardReceive?: (player: PlayerInterface, card: CardInterface) => void;
  onTurnStart?: (player: PlayerInterface) => void;
  onTurnEnd?: () => void;
  onOut?: (player: PlayerInterface, score: number) => void;
  onReset?: (player: PlayerInterface) => void;
}

abstract class AbstractPlayer implements PlayerInterface {
  private _hand: HandInterface;
  private _name: string;
  private _id: string;
  private _isIn: boolean;

  protected _onCardReceive?: (card: CardInterface) => void;
  protected _onTurnStart?: () => void;
  protected _onTurnEnd?: () => void;
  protected _onOut?: (score: number) => void;
  protected _onReset?: () => void;

  public constructor(name: string, args?: PlayerCallbacks, hand = new Hand()) {
    this._id = _.uniqueId();
    this._name = name;
    this._hand = hand;
    this._isIn = true;
    this._onCardReceive = args?.onCardReceive?.bind(this, this);
    this._onTurnStart = args?.onTurnStart?.bind(this, this);
    this._onOut = args?.onOut?.bind(this, this);
    this._onReset = args?.onReset?.bind(this, this);
    this._onTurnEnd = args?.onTurnEnd;
  }

  public isIn() {
    return this._isIn;
  }

  public out() {
    this._isIn = false;
    this._onOut?.(this.gameScore);
  }

  public get gameScore() {
    return this._hand
      .getPossibleCardValues()
      .reduce(
        (prev, curr) =>
          (curr > MAX_VALID_SCORE && (curr < prev || prev === 0)) ||
          (curr <= MAX_VALID_SCORE && (curr > prev || prev > MAX_VALID_SCORE))
            ? curr
            : prev,
        0
      );
  }

  public receiveCard(card: Card) {
    this._hand.addCard(card);
    this._onCardReceive?.(card);
  }

  public isBust() {
    return Math.min(...this._hand.getPossibleCardValues()) > MAX_VALID_SCORE;
  }

  public get name() {
    return this._name;
  }

  public get hand() {
    return this._hand;
  }

  public get id() {
    return this._id;
  }

  public set name(name: string) {
    this._name = name;
  }

  public reset() {
    this._hand = new Hand();
    this._isIn = true;
    this._onReset?.();
  }

  public abstract getDecision(deck: DeckInterface): Promise<PlayerDecision>;
  public abstract serialize(): SerializedPlayer;
}

export default AbstractPlayer;
