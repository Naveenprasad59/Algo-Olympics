const doMerge = (arr: number[], start: number, mid: number, end: number, aux: number[]) => {
  let k = start;
  let i = start;
  let j = mid + 1;

  while (i <= mid && j <= end) {
    if (aux[i] < aux[j]) {
      arr[k++] = aux[i++];
    } else {
      arr[k++] = aux[j++];
    }
  }

  while (i <= mid) {
    arr[k++] = aux[i++];
  }

  while (j <= end) {
    arr[k++] = aux[j++];
  }
};

const mergeHelper = (arr: number[], start: number, end: number, aux: number[]) => {
  if (start === end) {
    return;
  }

  const mid = Math.floor((start + end) / 2);
  mergeHelper(aux, start, mid, arr);
  mergeHelper(aux, mid + 1, end, arr);
  doMerge(arr, start, mid, end, aux);
};

export const mergeSort = (arr: number[]): number[] => {
  if (arr.length <= 1) return arr;

  const auxArr = [...arr];
  mergeHelper(arr, 0, arr.length - 1, auxArr);
  return arr;
};
