var arr = [];

const swap = (arr, a, b) => {
  let t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
};

const SelectionSort = (array, left, right, animationArr) => {
  arr = array.slice(0);
  var i,
    j,
    min_idx,
    n = arr.length;

  // One by one move boundary of unsorted subarray
  for (i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    for (j = i + 1; j < n; j++) {
      if (arr[j] < arr[min_idx]) {
        animationArr.push(["compare_true", j, min_idx]);
        min_idx = j;
      } else {
        animationArr.push(["compare_false", j, min_idx]);
      }
    }

    // Swap the found minimum element with the first element
    animationArr.push(["swap", i, min_idx]);
    swap(arr, min_idx, i);
  }
};

export default SelectionSort;
