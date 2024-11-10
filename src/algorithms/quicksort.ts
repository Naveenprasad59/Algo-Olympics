const swap = (arr: number[], pos1: number, pos2: number) => {
  const temp = pos1;
  arr[pos1] = arr[pos2];
  arr[pos2] = temp;
};

const quickSortHelper = (arr: number[], start: number, end: number) => {
  if (end >= start) return;
  const pivot = start;
  let left = start + 1;
  let right = end;

  while (left <= right) {
    if (arr[left] >= arr[pivot] && arr[right] <= arr[pivot]) {
      swap(arr, left, right);
    }
    if (arr[left] < arr[pivot]) {
      left++;
    }
    if (arr[right] > arr[pivot]) {
      right++;
    }
  }

  swap(arr, pivot, right);
  quickSortHelper(arr, start, right - 1);
  quickSortHelper(arr, right + 1, end);
};

export const quickSort = (arr: number[]) => {
  quickSortHelper(arr, 0, arr.length - 1);
  return arr;
};
