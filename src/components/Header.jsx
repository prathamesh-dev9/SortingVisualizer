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
import SelectionSort from "../algorithms/SelectionSort";

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
        : currentAlgo === 2
        ? BubbleSort
        : SelectionSort;
    doSort(array, 0, array.length - 1, animationArr);
    dispatch(insertAnimationSteps(animationArr));
    dispatch(startAnimation(true));
  };

  return (
    <>
      <div className="font-[Montserrat] flex self-start w-full justify-between items-center bg-[#3c3c3c] lg:py-4 lg:px-20 max-md:p-4 max-sm:flex-col max-sm:gap-4 text-white rounded-xl">
        <div className="flex items-center font-extrabold text-2xl max-md:text-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
          </svg>
          <span className="mx-2">Sorting Visualizer</span>
        </div>
        <button
          className="mx-24 max-md:mx-0 p-3 max-md:hidden text-white font-bold bg-cyan-500 hover:bg-cyan-600 cursor-pointer rounded-lg"
          onClick={handleGenerateRandomArray}
        >
          Generate New Array
        </button>
        <div className="flex flex-1 lg:flex max-md:hidden">
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
        <div className="relative flex flex-col gap-4 justify-between w-full lg:hidden">
          <div className="flex justify-between ">
            <select
              className="p-2 bg-[#3c3c3c] w-9/12 border rounded-md shadow-sm"
              onChange={(e) => handleSetAlgorithm(parseInt(e.target.value))}
            >
              {algorithms.map((item, idx) => (
                <option
                  key={idx}
                  value={idx}
                  className="m-2 cursor-pointer items-center flex flex-col hover:text-sky-400 font-bold"
                >
                  {item.name}
                </option>
              ))}
            </select>
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
          <button
            className="mx-24 max-md:mx-0 p-3 text-white font-bold bg-cyan-500 hover:bg-cyan-600 cursor-pointer rounded-lg"
            onClick={handleGenerateRandomArray}
          >
            Generate New Array
          </button>
        </div>
        <button
          className={`p-3 text-white font-bold bg-cyan-500  rounded-lg max-md:hidden ${
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
