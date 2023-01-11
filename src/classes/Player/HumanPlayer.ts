import { PlayerDecision } from "../../enums/PlayerDecision";
import DecisionEventDetail from "../../events/DecisionEventDetail";
import { SerializedPlayer } from "../../types/types";
import AbstractPlayer from "./AbstractPlayer";

class HumanPlayer extends AbstractPlayer {
  private outstandingHandler: ((e: Event) => any) | undefined = undefined;

  private getDecisionHandler() {
    return (
      resolve: (value: PlayerDecision | PromiseLike<PlayerDecision>) => void,
      reject: (reason?: any) => void,
      e: Event
    ) => {
      const eventDetail = (e as CustomEvent<DecisionEventDetail>).detail;
      this._onTurnEnd?.();
      resolve(eventDetail.decision);
    };
  }

  public getDecision() {
    this._onTurnStart?.();
    const decisionHandler = this.getDecisionHandler();
    const id = this.id;
    return new Promise<PlayerDecision>((resolve, reject) => {
      if (this.outstandingHandler)
        window.removeEventListener(`decision-${id}`, this.outstandingHandler);
      const handler = decisionHandler.bind(this, resolve, reject);
      this.outstandingHandler = handler;
      window.addEventListener(`decision-${id}`, handler, { once: true });
    });
  }

  public serialize(): SerializedPlayer {
    return {
      name: this.name,
      id: this.id,
      hand: this.hand.serialize(),
      instance: "HUMAN",
    };
  }
}

export default HumanPlayer;
