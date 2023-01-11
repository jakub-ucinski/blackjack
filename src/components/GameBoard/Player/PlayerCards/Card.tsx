import React, { FC } from "react";
import { Suit } from "../../../../enums/Suit";
import styles from "./Card.module.scss";
import {
  BsSuitClubFill,
  BsSuitSpadeFill,
  BsSuitHeartFill,
  BsSuitDiamondFill,
} from "react-icons/bs";
import { SerializedCard } from "../../../../types/types";

const getIcon = (suit: string) => {
  switch (suit) {
    case Suit.CLUBS:
      return <BsSuitClubFill />;
    case Suit.DIAMOND:
      return <BsSuitDiamondFill />;
    case Suit.HEARTS:
      return <BsSuitHeartFill />;
    case Suit.SPADES:
      return <BsSuitSpadeFill />;
  }
};

const getColorClass = (suit: string) => {
  switch (suit) {
    case Suit.DIAMOND:
    case Suit.HEARTS:
      return styles.Red;
    case Suit.CLUBS:
    case Suit.SPADES:
      return styles.Black;
  }
};

interface CardProps {
  card: SerializedCard;
}

const Card: FC<CardProps> = ({ card }) => {
  return (
    <div className={`${styles.Card} ${getColorClass(card.suit)}`}>
      <div className={styles.Face}>{card.face}</div>
      <div className={styles.Suit}>{getIcon(card.suit)}</div>
    </div>
  );
};

export default Card;
