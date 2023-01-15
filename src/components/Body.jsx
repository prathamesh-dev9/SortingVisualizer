import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetAnimation, setAnimationIntv } from "../reducers/animate";
import { handleShiftReplace, handleSwap } from "../reducers/array";

var step = 0;
var intv;
export default function Body() {
  const [currentAction, setCurrentAction] = useState({
    pivot: null,
    i: "",
    j: "",
    action: "",
  });

  const array = useSelector((state) => state.array.value);
  const isStarted = useSelector((state) => state.animation.isStarted);
  const currentAlgo = useSelector((state) => state.algorithm.currentAlgo);
  const animationArr = useSelector((state) => state.animation.animationArray);

  const dispatch = useDispatch();

  const animateQuick = () => {
    if (step <= animationArr.length - 1) {
      const action = animationArr[step];
      setCurrentAction(action);
      switch (action[0]) {
        case "compare_true": {
          dispatch(handleSwap({ i: action[1], j: action[2] }));
          setCurrentAction({
            action: action[0],
            i: action[1],
            j: action[2],
            pivot: action[3],
          });
          break;
        }
        case "compare_false": {
          setCurrentAction({
            action: action[0],
            i: action[1],
            j: action[2],
            pivot: action[3],
          });
          break;
        }
        case "fixed": {
          dispatch(handleSwap({ i: action[1], j: action[2] }));
          setCurrentAction({
            ...currentAction,
            action: action[0],
            i: action[1],
            j: action[2],
          });
          break;
        }
        default: {
          break;
        }
      }
    } else {
      step = 0;
      clearInterval(intv);
      dispatch(resetAnimation());
    }
    step++;
  };

  const animateMerge = () => {
    if (step <= animationArr.length - 1) {
      const action = animationArr[step];
      setCurrentAction(action);
      switch (action[0]) {
        case "compare_true": {
          setCurrentAction({
            ...currentAction,
            i: action[1],
            j: action[2],
            action: action[0],
          });
          break;
        }
        case "compare_false": {
          setCurrentAction({
            ...currentAction,
            i: action[1],
            j: action[2],
            action: action[0],
          });
          break;
        }
        case "shift_replace": {
          dispatch(handleShiftReplace({ start: action[1], index: action[2] }));
          setCurrentAction({
            ...currentAction,
            i: action[1],
            j: action[2],
            action: action[0],
          });
          break;
        }
        default: {
          break;
        }
      }
    } else {
      step = 0;
      clearInterval(intv);
      dispatch(resetAnimation());
    }
    step++;
  };

  useEffect(() => {
    if (intv) {
      clearInterval(intv);
    }

    if (isStarted) {
      intv = setInterval(() => {
        currentAlgo === 0 ? animateQuick() : animateMerge();
      }, 80);
      dispatch(setAnimationIntv(intv));
    } else {
      step = 0;
      setCurrentAction({
        pivot: null,
        i: "",
        j: "",
        action: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStarted]);

  return (
    <div className="bg-[#3c3c3c] mt-8 py-4 px-20 w-full text-white rounded-xl flex justify-center h-4/5">
      {(array || []).map((item, idx) => {
        return (
          <div
            key={idx}
            className={`w-4 text-[8px] text-center text-zinc-300 bg-teal-600 m-1 ${
              idx === currentAction?.pivot && "bg-yellow-400"
            } 
            ${
              currentAction.action === "compare_true" &&
              (idx === currentAction?.i || idx === currentAction?.j) &&
              "bg-green-500"
            }
            ${
              currentAction.action === "compare_false" &&
              (idx === currentAction?.i || idx === currentAction?.j) &&
              "bg-red-500"
            }`}
            style={{ height: `${(item * 100) / 18}px` }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
}
