import { createSlice } from "@reduxjs/toolkit";

export const deviceSlice = createSlice({
  name: "device",
  initialState: {
    isMobile: false,
    isPC: true,
  },
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsPC: (state, action) => {
      state.isPC = action.payload;
    },
  },
});

export const { setIsMobile, setIsPC } = deviceSlice.actions;
