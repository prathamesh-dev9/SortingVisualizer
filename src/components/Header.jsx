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
          <img
            alt="Sorting Visualizer"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAGQ0lEQVR4nO2Ye2xTdRTHv/d23drbtd2DbuuerAzHU5AEHxgHOgZiAF0UIkuMKAYH20AEE2AwCQiEaRDkOUAcBpQtQAANThD2KHvC2AMYuLlh2RvGngIhCDOn+TW5vZeFGmQM029y/mhue3/n8zu/8/gVcMopp5xyyqm+KV8AiQDWA0gFcADAQQCz8JTo8NgRiqzFMW45m+ar8tNWaIr3LBWKBBV3CcBreAp0LCNZOH8/06NbbNNfVWYCSMBToPS0JE2xFCBylCILwHvoI3oFwFoAKcw+AeDKnn237VOhQAowpD9/GsA49AEladRcRcIUXc5Xs7yK1rzvlevrwZ8FsIw937LuY7dcKYDRi6PvjEQfUFXN7uAbXQf7d9vs+Bd+lKC57PmW5Fi1DMDTnSsHYHrCvkOl4FEndp6sbEtAHQDaYdK2r+aq86QAFDUAQU/YfwgKHo1SgML1/lcAFLLvpKyPlwOolFwVAL/edljLwm5bWMXzaJICnFhjPUJUZUg7v5mnypcCKF1gAeDZG05/DaAUQBPPoVGj5C4qFdyfAGKo0vAcrkkBDiYayqj+s9+n7lgkr0IKHg0A1I/b+Qi9ii87O89Y3bkq5O6t1SHdZPtiDOcA/ATAheNgl8BkqQsMZ9m4QPohdYlwRgrAc2gBwD9ugDfCvBW5NsdtVhDndxlAETnAcWiVAuxI6EfP9rJ3HEj7XHNOCkDg6AW9NdRXaZYCVCz0r2XHChyHdinA9ngrwPfsHUePrNGUSgEAXOsNgOkj/V2zpQA1iwNo9yoYQIcUICWuX6EIIEM6C9096XEPAG3CI+tZAPkAqgFQYrZSsgKoBPAcAYzwd82RAtQlBrYD+MMKAHkEtsV5UQT2sDVOZm/UVIgB2n7WdQKgSvXISo4eoDHXzAy9bZkZ2mX5wNRGFq5XmgFMBvD2MF+lHGBZIDlw1QrwgBzYGuddKAIwF2x1rxQDVP+orQdw5r8AWPpOmDanMzasW2xDvFxzAEyiHBjsI8+BpuVBNwE0UhWiatIlBZhrB1BYssu9WgxQtN2dmhiN0w4pCsBCALNFRp8DAMwZF6CWAQzytAJMBPDmsAck8fWk4FsAaFwQeB7NUoDNc+wASi+mai1igGPrhHJRn3ioKicYhMwogzrLZjoXvpzN4rERAWqzFGCgXkmj7ngA00YFyJOYRYDyRu+iQO1DAC5V7dPWiQHoVgbgkKMAzU1Rplttrw/ottkkH+EUgI9obo8MFGQRCNMrc9l1L+aFYDlA/bLALlaFjDTTdEkANsV6F7D7L6nGsl/XLAY4vFpTQldNRwFab0w03bEDMAh0/mIpB6aaNLIImHTKPABjAcyMCHXLkgEkBnYAICfCdQJ//iEA9Y2H9DfEABlfCjRqZDgK0NY6ccA9McAYT3Umm2XWzR6qlwH01ynz2S1rdtRAVWYPZZQa2WgfD764BwBbH2hqOaprFwNkbtBQ9LIdBWgXO08WrrGWSaoyKctHe+ZLAYLcFXSGXwIQP3mw+pQU4OrSQOoX5wFEBhsUBT0A7GPrN3T+orspBij7Vlvzb8qoDCBQpaAFIgCkbR7rUywF8BUU9PIRABZEDxNkAFeWWAFoF6eGGZV5PQDsZ+vX3T7hcUcMUJuua7J1ckd0vXmCye4IGd2sOzwGwK/pk4wXpAAGFU/TZjiAxdOG9wjwu7XMhriae5iF0tn6V7uO6f4SA9BnWyd3RPX14+2rkI+rdYefpyZzKjqgWgrgpeIpQZ8BsGLGSDkA6wN0DN4dM8gtWwqw9zMf2oA0tn55wwF9ix1Ahs5Whh1SnSUy1A7A25UvZv8IXC6dEdz4gAjQPD8YwOr4l7WyKtS5MuQ+a2QLprwoZEoBds63RmA3W3+DycgXrPrQ7fTGBHXejkVC4fFkgfInz+EIlEQENVRHhrbZTOfCUxkbQhE4Mtn/otj5jtiw+x5u1gjQoJcw3M/V3LEy5G8xQHasHw17dAxjvLR8SU6ysbJmd1DLb2v9LiXFeJr1gvX9M9j6Lux/0M3sPyO66NBtbLojzitYuaIdvcDCVsvOr5ZVIgvPWa+LFg5o44Au1mSUAHTUMTkO9RyHNma28z+e3ajms4m2it2DdwGIRi/LHYCmtxd1yimnnHLKqf+N/gFRUDEvejB38gAAAABJRU5ErkJggg=="
          />
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
