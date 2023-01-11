import { configureStore } from "@reduxjs/toolkit";
import PlayersSliceReducer, { PlayersSlice } from "./players-reducer";
import GameSliceReducer, { GameSlice } from "./game-reducer";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface RootState {
  players: PlayersSlice;
  game: GameSlice;
}

const store = configureStore<RootState>({
  reducer: {
    players: PlayersSliceReducer,
    game: GameSliceReducer,
  },
});

export default store;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
