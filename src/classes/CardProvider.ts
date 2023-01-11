import CardProviderInterface from "../interfaces/CardProviderInterface";
import Card from "./Card";
import { Suit } from "./../enums/Suit";
import { Face } from "../enums/Face";

class CardProvider implements CardProviderInterface {
  public getCard(face: Face, suit: Suit) {
    return new Card(face, suit, this.getFaceValues(face));
  }

  private getFaceValues(face: Face) {
    switch (face) {
      case Face.N2:
        return [2];
      case Face.N3:
        return [3];
      case Face.N4:
        return [4];
      case Face.N5:
        return [5];
      case Face.N6:
        return [6];
      case Face.N7:
        return [7];
      case Face.N8:
        return [8];
      case Face.N9:
        return [9];
      case Face.N10:
      case Face.J:
      case Face.Q:
      case Face.K:
        return [10];
      case Face.A:
        return [1, 11];
    }
  }
}

export default CardProvider;
