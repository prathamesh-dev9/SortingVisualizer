var arr = [];

function swap(arr, a, b) {
  let t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
}

function partition(arr, left, right, animationArr) {
  let pivot = arr[right];
  let i = left - 1;

  for (let j = left; j <= right - 1; j++) {
    if (arr[j] < pivot) {
      i++;
      swap(arr, i, j);
      animationArr.push(["compare_true", i, j, right]);
    } else {
      animationArr.push(["compare_false", i, j, right]);
    }
  }
  swap(arr, i + 1, right);
  animationArr.push(["fixed", i + 1, right]);
  return i + 1;
}

function QuickSort(array, left, right, animationArr) {
  arr = array.slice(0);
  if (left < right) {
    let p = partition(arr, left, right, animationArr);
    QuickSort(arr, left, p - 1, animationArr);
    QuickSort(arr, p + 1, right, animationArr);
  }

  return arr;
}

export default QuickSort;
