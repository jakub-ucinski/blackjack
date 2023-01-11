import { SerializedCard, SerializedPlayer } from "./../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddPlayerCardPayload {
  player: SerializedPlayer;
  card: SerializedCard;
}

interface SetScorePayload {
  playerId: string;
  score: number;
}

export interface PlayersSlice {
  [playerId: string]: {
    cards: SerializedCard[];
    player: SerializedPlayer;
    finalRoundScore: number | undefined;
  };
}

// Define the initial state using that type
const initialState: PlayersSlice = {};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action: PayloadAction<SerializedPlayer>) => {
      const player = action.payload;
      const id = player.id;
      if (!(id in state))
        state[id] = { cards: [], player, finalRoundScore: undefined };
    },
    removePlayer: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      if (id in state) delete state[id];
    },
    addPlayerCard: (state, action: PayloadAction<AddPlayerCardPayload>) => {
      const player = action.payload.player;
      const id = player.id;
      const card = action.payload.card;
      if (!(id in state))
        state[id] = { player, cards: [], finalRoundScore: undefined };
      state[id].cards.push(card);
    },
    setScore: (state, action: PayloadAction<SetScorePayload>) => {
      const id = action.payload.playerId;
      const score = action.payload.score;
      state[id].finalRoundScore = score;
    },
    reset: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state[id].cards = [];
      state[id].finalRoundScore = undefined;
    },
  },
});

export const playersActions = playersSlice.actions;
export default playersSlice.reducer;
