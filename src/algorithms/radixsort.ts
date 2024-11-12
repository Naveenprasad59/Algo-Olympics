function countingSort(arr: number[], exp: number): number[] {
  const output: number[] = new Array(arr.length).fill(0);
  const count: number[] = new Array(10).fill(0);

  for (let i = 0; i < arr.length; i++) {
    const index = Math.floor(arr[i] / exp) % 10;
    count[index]++;
  }

  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1];
  }

  for (let i = arr.length - 1; i >= 0; i--) {
    const index = Math.floor(arr[i] / exp) % 10;
    output[count[index] - 1] = arr[i];
    count[index]--;
  }

  for (let i = 0; i < arr.length; i++) {
    arr[i] = output[i];
  }

  return arr;
}

function findMax(arr: number[]): number {
  let max = arr[0];
  for (const value of arr) {
    max = Math.max(max, value);
  }
  return max;
}

export function radixSort(arr: number[]): number[] {
  // const max = Math.max(...arr);
  const max = findMax(arr);

  for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
    countingSort(arr, exp);
  }

  return arr;
}
