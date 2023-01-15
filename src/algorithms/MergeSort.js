var arr = [];

const merge = (arr, start, mid, end, animationArr) => {
  let start2 = mid + 1;

  // If the direct merge is already sorted
  if (arr[mid] <= arr[start2]) {
    return;
  }

  while (start <= mid && start2 <= end) {
    if (arr[start] <= arr[start2]) {
      animationArr.push(["compare_true", start, start2]);
      start++;
    } else {
      animationArr.push(["compare_false", start, start2]);
      let value = arr[start2];
      let index = start2;

      // Shift all the elements between start & index towards right by 1.
      animationArr.push(["shift_replace", start, index]);
      while (index !== start) {
        arr[index] = arr[index - 1];
        index--;
      }
      arr[start] = value;

      start++;
      mid++;
      start2++;
    }
  }
};

const MergeSort = (array, l, r, animationArr) => {
  arr = array.slice(0);
  if (l < r) {
    let m = l + Math.floor((r - l) / 2);

    // Sort first and second halves
    MergeSort(arr, l, m, animationArr);
    MergeSort(arr, m + 1, r, animationArr);

    merge(arr, l, m, r, animationArr);
  }
};

export default MergeSort;
