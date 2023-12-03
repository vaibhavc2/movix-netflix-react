import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { exploreSlice } from "./reducers/explore-slice";
import { homeSlice } from "./reducers/home-slice";
import { searchSlice } from "./reducers/search-slice";

export const store = configureStore({
  reducer: {
    home: homeSlice.reducer,
    search: searchSlice.reducer,
    explore: exploreSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
