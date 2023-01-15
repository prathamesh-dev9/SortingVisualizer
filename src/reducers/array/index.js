import { createSlice } from "@reduxjs/toolkit";
import { getRandomNumberArray } from "../../utils/generateRandomArray";

const initialState = {
  value: getRandomNumberArray(),
};

export const arraySlice = createSlice({
  name: "array",
  initialState,
  reducers: {
    setArray: (state, action) => {
      state.value = action.payload;
    },
    handleSwap: (state, action) => {
      var arrayToBeUpdated = state.value;
      var item = arrayToBeUpdated[action.payload.i];
      arrayToBeUpdated[action.payload.i] = arrayToBeUpdated[action.payload.j];
      arrayToBeUpdated[action.payload.j] = item;
      state.value = arrayToBeUpdated;
    },
    handleShiftReplace: (state, action) => {
      var arrayToBeUpdated = state.value;
      // logic to shift the subarray from start to index by 1 towards right (merge-sort)
      // & then swap element from start and start + 1
      arrayToBeUpdated = arrayToBeUpdated
        .slice(0, action.payload.start + 1)
        .concat(
          arrayToBeUpdated
            .slice(action.payload.start + 1, action.payload.index + 1)
            .slice(-1)
            .concat(
              arrayToBeUpdated
                .slice(action.payload.start + 1, action.payload.index + 1)
                .slice(0, -1)
            )
        )
        .concat(arrayToBeUpdated.slice(action.payload.index + 1));

      var item = arrayToBeUpdated[action.payload.start];
      arrayToBeUpdated[action.payload.start] = arrayToBeUpdated[action.payload.start + 1];
      arrayToBeUpdated[action.payload.start + 1] = item;

      state.value = arrayToBeUpdated;
    },
    generateArray: (state) => {
      state.value = getRandomNumberArray();
    },
  },
});

export const { setArray, handleSwap, handleShiftReplace, generateArray } =
  arraySlice.actions;

export default arraySlice.reducer;
