import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isStarted: false,
  interval: null,
  animationArray: [],
};

export const animateSlice = createSlice({
  name: "Animate",
  initialState,
  reducers: {
    startAnimation: (state, action) => {
      state.isStarted = action.payload;
    },
    setAnimationIntv: (state, action) => {
      state.interval = action.payload;
    },
    resetAnimation: (state, action) => {
      clearInterval(state.interval);
      state.isStarted = false;
      state.animationArray = initialState.animationArray;
      state.interval = null;
    },
    insertAnimationSteps: (state, action) => {
      state.animationArray = action.payload;
    },
  },
});

export const {
  startAnimation,
  resetAnimation,
  insertAnimationSteps,
  setAnimationIntv,
} = animateSlice.actions;

export default animateSlice.reducer;
