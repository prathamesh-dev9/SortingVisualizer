import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setAlgorithm } from "../reducers/algorithm";
import {
  insertAnimationSteps,
  resetAnimation,
  startAnimation,
} from "../reducers/animate";
import { generateArray } from "../reducers/array";

import QuickSort from "../algorithms/QuickSort";
import MergeSort from "../algorithms/MergeSort";
import BubbleSort from "../algorithms/BubbleSort";

export default function Header() {
  const { currentAlgo, algorithms } = useSelector((state) => state.algorithm);
  const array = useSelector((state) => state.array.value);
  const isStarted = useSelector((state) => state.animation.isStarted);

  const dispatch = useDispatch();

  const handleGenerateRandomArray = () => {
    dispatch(resetAnimation());
    dispatch(generateArray());
  };

  const handleSetAlgorithm = (algo) => {
    dispatch(setAlgorithm(algo));
  };

  const handleSort = () => {
    const animationArr = [];
    const doSort =
      currentAlgo === 0
        ? QuickSort
        : currentAlgo === 1
        ? MergeSort
        : BubbleSort;
    doSort(array, 0, array.length - 1, animationArr);
    dispatch(insertAnimationSteps(animationArr));
    dispatch(startAnimation(true));
  };

  return (
    <>
      <div className="font-[Montserrat] flex self-start w-full justify-between items-center bg-[#3c3c3c] py-4 px-20 text-white rounded-xl">
        <div className="font-extrabold text-2xl">Sorting Visualizer</div>
        <button
          className="mx-24 p-3 text-white font-bold bg-cyan-500 hover:bg-cyan-600 cursor-pointer rounded-lg"
          onClick={handleGenerateRandomArray}
        >
          Generate New Array
        </button>
        <div className="flex flex-1">
          {algorithms.map((item, idx) => (
            <span
              key={idx}
              className={`m-2 cursor-pointer items-center flex flex-col hover:text-sky-400 font-bold ${
                currentAlgo === idx ? "text-sky-400 font-bold" : ""
              }`}
              onClick={() => handleSetAlgorithm(idx)}
            >
              {item.name}
            </span>
          ))}
        </div>
        <button
          className={`p-3 text-white font-bold bg-cyan-500  rounded-lg ${
            isStarted
              ? "opacity-50"
              : "opacity-100  hover:bg-cyan-600 cursor-pointer"
          }`}
          onClick={handleSort}
          disabled={isStarted}
        >
          Sort
        </button>
      </div>
    </>
  );
}
