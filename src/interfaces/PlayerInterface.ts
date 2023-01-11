import { SerializedPlayer } from "./../types/types";
import { PlayerDecision } from "../enums/PlayerDecision";
import Serializable from "./Serializable";
import DeckInterface from "./DeckInterface";
import CardInterface from "./CardInterface";
import HandInterface from "./HandInterface";

interface PlayerInterface extends Serializable {
  receiveCard(card: CardInterface): void;
  getDecision: (Deck: DeckInterface) => Promise<PlayerDecision>;
  isBust: () => boolean;
  isIn: () => boolean;
  out: () => void;
  reset: () => void;
  serialize: () => SerializedPlayer;
  get name(): string;
  get id(): string;
  get hand(): HandInterface;
  set name(name: string);
  get gameScore(): number;
}

export default PlayerInterface;
