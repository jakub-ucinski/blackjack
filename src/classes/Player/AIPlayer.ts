import {
  AI_DECISION_TIME,
  MAX_VALID_SCORE,
} from "./../../constants/game-constants";
import Hand from "../Hand";
import AbstractPlayer, { PlayerCallbacks } from "./AbstractPlayer";
import NameGenerator from "../NameGenerator";
import DeckInterface from "../../interfaces/DeckInterface";
import { PlayerDecision } from "../../enums/PlayerDecision";
import { SerializedPlayer } from "../../types/types";

class AIPlayer extends AbstractPlayer {
  constructor(args?: PlayerCallbacks, hand = new Hand()) {
    super(NameGenerator.generate(), { ...args }, hand);
  }

  public getDecision(deck: DeckInterface): Promise<PlayerDecision> {
    this._onTurnStart?.();
    return new Promise((res, _) => {
      setTimeout(() => {
        this._onTurnEnd?.();
        res(this.makeDecision(deck));
      }, AI_DECISION_TIME);
    });
  }

  private calculateExpectation(deck: DeckInterface) {
    // Asses only count 1 in the expectation - if I decide that if expectation is lower than my threshold is good, I shouldn't consider aces big.
    const sum = deck.cards.reduce(
      (minSum, currCard) => minSum + Math.min(...currCard.values),
      0
    );
    return sum / deck.cards.length;
  }

  private makeDecision(deck: DeckInterface): PlayerDecision {
    const expectation = this.calculateExpectation(deck);
    const possibleValues = this.hand.getPossibleCardValues();

    const minDelta = MAX_VALID_SCORE - Math.max(...possibleValues);
    const maxDelta = MAX_VALID_SCORE - Math.min(...possibleValues);

    const maxCardLeft = Math.max(
      ...deck.cards.map((card) => Math.min(...card.values))
    );
    const minCardLeft = Math.min(
      ...deck.cards.map((card) => Math.min(...card.values))
    );

    // base cases
    if (minCardLeft > maxDelta) {
      return PlayerDecision.STAND;
    }

    if (maxCardLeft < minDelta) {
      return PlayerDecision.HIT;
    }

    // Anything else is a grayscale - heuristic expectation

    const deltaRange = 1 + (maxDelta - minDelta) / (2 * MAX_VALID_SCORE); //The decision should be dependent on the range between deltas
    // - if I fail to hit the min Delta, I can always hit the other delta. The risk tolerance should be proportional to this range.

    const naivety = 1 + (expectation - maxDelta) / 10; // Closer to 1 : it would be less naive to hit,
    const caution = (0.3 * MAX_VALID_SCORE) / (minDelta + 1);

    const naiveRisk = 0.3; // greater than 1 - risky, smaller than 1 not risky
    const longTermGoalRisk = 0.5; // greater than 1 - risky, smaller than 1 not risky
    const safeRisk = 0.9; // Tolerance to risk given

    if (expectation > minDelta && expectation > maxDelta) {
      const riskScore = (naiveRisk * deltaRange) / (naivety * caution);
      return Math.random() < riskScore
        ? PlayerDecision.HIT
        : PlayerDecision.STAND;
    } else if (expectation > minDelta && expectation < maxDelta) {
      const riskScore = (longTermGoalRisk * deltaRange) / (naivety * caution);

      return Math.random() < riskScore
        ? PlayerDecision.HIT
        : PlayerDecision.STAND;
    } else {
      const riskScore = (safeRisk * deltaRange) / (naivety * caution);
      return Math.random() < riskScore
        ? PlayerDecision.HIT
        : PlayerDecision.STAND;
    }
  }

  public serialize(): SerializedPlayer {
    return {
      name: this.name,
      id: this.id,
      hand: this.hand.serialize(),
      instance: "AI",
    };
  }
}

export default AIPlayer;
