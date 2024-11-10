const swap = (arr: number[], index1: number, index2: number) => {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
};

const heapify = (arr: number[], index: number, length = arr.length) => {
  let largest = index;
  const left = 2 * index + 1;
  const right = 2 * index + 2;

  if (left < length && arr[left] > arr[index]) {
    largest = left;
  }

  if (right < length && arr[right] > arr[index]) {
    largest = right;
  }

  if (largest !== index) {
    swap(arr, largest, index);
    heapify(arr, largest, length);
  }
};

export const heapsort = (arr: number[]): number[] => {
  for (let index = Math.floor(arr.length / 2); index >= 0; index--) {
    heapify(arr, index);
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    swap(arr, i, 0);
    heapify(arr, 0, i);
  }

  return arr;
};
