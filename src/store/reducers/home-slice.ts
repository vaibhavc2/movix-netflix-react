import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InitialHomeState = {
  url: {},
  genres: {},
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    getApiConfig: (state, action: PayloadAction<any>) => {
      state.url = action.payload;
    },
    getGenres: (state, action: PayloadAction<any>) => {
      state.genres = action.payload;
    },
  },
});

export const { getApiConfig, getGenres } = homeSlice.actions;

export default homeSlice.reducer;
