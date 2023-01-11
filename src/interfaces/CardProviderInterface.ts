import { Face } from "../enums/Face";
import { Suit } from "../enums/Suit";
import CardInterface from "./CardInterface";

interface CardProviderInterface {
  getCard(face: Face, suit: Suit): CardInterface;
}

export default CardProviderInterface;
