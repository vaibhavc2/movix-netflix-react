import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const homeSlice = createSlice({
  name: "home",
  initialState: {
    url: {
      backdrop: "",
      poster: "",
      profile: "",
    },
    genres: {} as any,
  },
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
