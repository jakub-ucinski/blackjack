import PlayerInterface from "./PlayerInterface";

interface ScoresInterface {
  get player(): PlayerInterface;
  get score(): number;
}

export default ScoresInterface;
