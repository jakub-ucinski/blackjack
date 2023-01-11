import { SerializedPlayer } from './../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface GameSlice {
  turn: SerializedPlayer | undefined;
}

// Define the initial state using that type
const initialState: GameSlice = {
  turn: undefined,
};

export const gameSlice = createSlice({
  name: "game",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setTurn: (state, action: PayloadAction<SerializedPlayer | undefined>) => {
      const player = action.payload;
      state.turn = player;
    },
  },
});

export const gameActions = gameSlice.actions;
export default gameSlice.reducer;
