import { combineReducers, configureStore } from "@reduxjs/toolkit";
import ArrayReducer from "../reducers/array";
import AlgoReducer from "../reducers/algorithm";
import AnimationReducer from "../reducers/animate";

const reducer = combineReducers({
  array: ArrayReducer,
  algorithm: AlgoReducer,
  animation: AnimationReducer,
});

const store = configureStore({
  reducer,
});

export default store;
