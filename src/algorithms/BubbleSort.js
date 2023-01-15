var arr = [];

function swap(arr, a, b) {
  let t = arr[a];
  arr[a] = arr[b];
  arr[b] = t;
}

const BubbleSort = (array, left, right, animationArr) => {
  arr = array.slice(0);
  var i, j, swapped, n = arr.length;

  for (i = 0; i < n - 1; i++) {
    swapped = false;
    for (j = 0; j < n - i - 1; j++) {
      animationArr.push(["compare_true", j, j + 1]);
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        animationArr.push(["swap", j, j + 1]);
        swapped = true;
      } else {
        animationArr.push(["compare_false", j, j + 1]);
      }
    }

    if (!swapped) break;
  }
};

export default BubbleSort;
