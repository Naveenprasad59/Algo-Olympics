function isSorted(arr: number[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

function shuffle(arr: number[]): void {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

export function bogoSort(arr: number[]): [arr: number[], didSort?: boolean] {
  const startTime = Date.now();
  const maxDuration = 5000; // 10 seconds in milliseconds

  while (!isSorted(arr)) {
    shuffle(arr);

    // Check if time limit has been reached
    if (Date.now() - startTime > maxDuration) {
      console.log('Time limit exceeded. Returning partially sorted array.');
      return [arr, false];
    }
  }

  return [arr, true];
}
