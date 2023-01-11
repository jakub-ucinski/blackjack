import React, { FC } from "react";
import { SerializedCard } from "../../../../types/types";
import Section from "../Section";
import Card from "./Card";
import styles from "./PlayerCards.module.scss";

interface PlayerCardsProps {
  cards: SerializedCard[];
}

const PlayerCards: FC<PlayerCardsProps> = ({ cards }) => {
  return (
    <Section label="Cards">
      <div className={styles.Cards}>
        {cards.map((card) => (
          <Card key={card.face + card.suit} card={card} />
        ))}
      </div>
    </Section>
  );
};
export default PlayerCards;
