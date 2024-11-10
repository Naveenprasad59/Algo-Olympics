import { mergeSort } from '../algorithms/mergesort';
import { quickSort } from '../algorithms/quicksort';
import { heapsort } from '../algorithms/heapsort';
import { bogoSort } from '../algorithms/bogosort';
import { inbuiltSort } from '../algorithms/inbuiltsort';
import { bubbleSort } from '../algorithms/bubblesort';
import { radixSort } from '../algorithms/radixsort';
import { insertionSort } from '../algorithms/insertionsort';

self.onmessage = function (e) {
  if (!e) return;
  try {
    const { numberOfElements } = e.data;

    console.time('Worker run');

    const createRandomArray = (n: number): number[] => {
      return Array.from({ length: n }, () => {
        return Math.floor(Math.random() * n);
      });
    };

    const doSort = (
      name: string,
      arr: number[],
      sort: (arr: number[]) => [arr: number[], didSort?: boolean] | number[],
    ): Promise<{ name: string; time: number; didSort: boolean }> => {
      return new Promise((resolve) => {
        if (name === 'bogoSort') {
          const start = performance.now();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, didSort] = sort(arr);
          const end = performance.now();
          return resolve({ name, time: end - start, didSort: Boolean(didSort) });
        }
        const start = performance.now();
        sort(arr);
        const end = performance.now();

        return resolve({ name, time: end - start, didSort: true });
      });
    };

    let results = [];

    const sourceArr = createRandomArray(numberOfElements);

    Promise.all([
      doSort('bogoSort', [...sourceArr], bogoSort),
      doSort('bubble', [...sourceArr], bubbleSort),
      doSort('insertion', [...sourceArr], insertionSort),
      doSort('Heap', [...sourceArr], heapsort),
      doSort('radix', [...sourceArr], radixSort),
      doSort('Merge', [...sourceArr], mergeSort),
      doSort('Quick', [...sourceArr], quickSort),
      doSort('Inbuilt(Tim)', [...sourceArr], inbuiltSort),
    ]).then((resultArr) => {
      console.timeEnd('Worker run');
      resultArr.sort((res1, res2) => res1.time - res2.time);
      results = resultArr;
      postMessage({ result: results });
    });
  } catch (error) {
    postMessage({ error });
  }
};
