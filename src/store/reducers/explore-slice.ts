import { createSlice } from "@reduxjs/toolkit";

export const exploreSlice = createSlice({
  name: "explore",
  initialState: {
    movie: {
      selectedGenres: Array<string>(),
      sortedBy: {
        label: "Popularity Descending",
        value: "popularity.desc",
      },
    },
    tv: {
      selectedGenres: Array<string>(),
      sortedBy: {
        label: "Popularity Descending",
        value: "popularity.desc",
      },
    },
  },
  reducers: {
    setMovieSelectedGenres: (state, action) => {
      state.movie.selectedGenres = action.payload;
    },
    setMovieSortedBy: (state, action) => {
      state.movie.sortedBy = action.payload;
    },
    setTVSelectedGenres: (state, action) => {
      state.tv.selectedGenres = action.payload;
    },
    setTVSortedBy: (state, action) => {
      state.tv.sortedBy = action.payload;
    },
  },
});

export const {
  setMovieSelectedGenres,
  setMovieSortedBy,
  setTVSelectedGenres,
  setTVSortedBy,
} = exploreSlice.actions;
