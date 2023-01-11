import { SerializedCard } from "./../types/types";
import { Face } from "./../enums/Face";
import { Suit } from "./../enums/Suit";
import Serializable from "./Serializable";

interface CardInterface extends Serializable {
  serialize: () => SerializedCard;
  get suit(): Suit;
  get face(): Face;
  get values(): number[];
}

export default CardInterface;
