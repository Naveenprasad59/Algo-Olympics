export const insertionSort = (arr: number[]): number[] => {
  for (let i = 1; i < arr.length; i++) {
    const pivot = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j + 1] > pivot) {
      arr[j + 1] = arr[j];
      j = j - 1;
    }
    arr[j + 1] = pivot;
  }

  return arr;
};
