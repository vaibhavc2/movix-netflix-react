import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: InitialHomeState = {
  url: {
    backdrop: "",
    poster: "",
    profile: "",
  },
  genres: {},
};

export const homeSlice = createSlice({
  name: "home",
  initialState: initialState,
  reducers: {
    setApiConfig: (state, action: PayloadAction<any>) => {
      state.url = action.payload;
    },
    setGenres: (state, action: PayloadAction<any>) => {
      state.genres = action.payload;
    },
  },
});

export const { setApiConfig, setGenres } = homeSlice.actions;

export default homeSlice.reducer;
