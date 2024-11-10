import { mergeSort } from '../algorithms/mergesort';
import { quickSort } from '../algorithms/quicksort';

self.onmessage = function (e) {
  if (!e) return;
  try {
    const { numberOfElements } = e.data;

    console.time('Worker run');

    const inbuiltSort = (arr: number[]) => {
      arr.sort();
      return arr;
    };

    const createRandomArray = (n: number): number[] => {
      return Array.from({ length: n }, () => {
        return Math.floor(Math.random() * n);
      });
    };

    const doSort = (
      name: string,
      arr: number[],
      sort: (arr: number[]) => number[],
    ): Promise<{ name: string; time: number }> => {
      return new Promise((resolve) => {
        const start = performance.now();
        sort(arr);
        const end = performance.now();
        return resolve({ name, time: end - start });
      });
    };

    let results = [];

    const sourceArr = createRandomArray(numberOfElements);

    Promise.all([
      doSort('Merge', [...sourceArr], mergeSort),
      doSort('Quick', [...sourceArr], quickSort),
      doSort('Inbuilt(Tim)', [...sourceArr], inbuiltSort),
    ]).then((resultArr) => {
      resultArr.sort((res1, res2) => res1.time - res2.time);
      results = resultArr;
      console.timeEnd('Worker run');
      postMessage({ result: results });
    });
  } catch (error) {
    postMessage({ error });
  }
};
