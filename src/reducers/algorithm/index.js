import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAlgo: 0,
  algorithms: [
    {
      id: "0",
      name: "Quick Sort",
    },
    {
      id: "1",
      name: "Merge Sort",
    },
    {
      id: "2",
      name: "Bubble Sort",
    },
    {
      id: "3",
      name: "Insertion Sort",
    },
  ],
};

export const algorithmSlice = createSlice({
  name: "algorithm",
  initialState,
  reducers: {
    setAlgorithm: (state, action) => {
      state.currentAlgo = action.payload;
    },
  },
});

export const { setAlgorithm } = algorithmSlice.actions;

export default algorithmSlice.reducer;
