import { mergeSort } from '../algorithms/mergesort';
import { quickSort } from '../algorithms/quicksort';
import { heapsort } from '../algorithms/heapsort';
import { bogoSort } from '../algorithms/bogosort';
import { inbuiltSort } from '../algorithms/inbuiltsort';
import { bubbleSort } from '../algorithms/bubblesort';
import { radixSort } from '../algorithms/radixsort';
import { insertionSort } from '../algorithms/insertionsort';
import { SORT_KEYS } from '../pages/1v1/constants';

self.onmessage = function (e) {
  if (!e) return;
  try {
    const sortingAlgoMap = {
      [SORT_KEYS.BOGO]: bogoSort,
      [SORT_KEYS.BUBBLE]: bubbleSort,
      [SORT_KEYS.HEAP]: heapsort,
      [SORT_KEYS.INBUILT]: inbuiltSort,
      [SORT_KEYS.INSERTION]: insertionSort,
      [SORT_KEYS.MERGE]: mergeSort,
      [SORT_KEYS.QUICK]: quickSort,
      [SORT_KEYS.RADIX]: radixSort,
    };
    const { numberOfElements, sortingAlgoKeys, race } = e.data;
    const algoKeys: SORT_KEYS[] = sortingAlgoKeys;

    console.time('Worker run' + race);
    console.log('script' + race);

    const createRandomArray = (n: number): number[] => {
      return Array.from({ length: n }, () => {
        return Math.floor(Math.random() * n);
      });
    };

    const doSort = (
      algoKey: SORT_KEYS,
      arr: number[],
      sort: (arr: number[]) => [arr: number[], didSort?: boolean] | number[],
    ): Promise<{ time: number; didSort: boolean; name: SORT_KEYS }> => {
      return new Promise((resolve) => {
        if (algoKey === SORT_KEYS.BOGO) {
          const start = performance.now();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, didSort] = sort(arr);
          const end = performance.now();
          return resolve({ time: end - start, didSort: Boolean(didSort), name: SORT_KEYS.BOGO });
        }
        const start = performance.now();
        sort(arr);
        const end = performance.now();

        return resolve({ time: end - start, didSort: true, name: algoKey });
      });
    };

    let results = [];

    const sourceArr = createRandomArray(numberOfElements);
    const resultApp = algoKeys.map((key) => {
      return doSort(key, [...sourceArr], sortingAlgoMap[key]);
    });

    // [
    //   doSort('bogoSort', [...sourceArr], bogoSort),
    //   doSort('bubble', [...sourceArr], bubbleSort),
    //   doSort('insertion', [...sourceArr], insertionSort),
    //   doSort('Heap', [...sourceArr], heapsort),
    //   doSort('radix', [...sourceArr], radixSort),
    //   doSort('Merge', [...sourceArr], mergeSort),
    //   doSort('Quick', [...sourceArr], quickSort),
    //   doSort('Inbuilt(Tim)', [...sourceArr], inbuiltSort),
    // ]

    Promise.all(resultApp).then((resultArr) => {
      console.timeEnd('Worker run' + race);
      resultArr.sort((res1, res2) => res1.time - res2.time);
      results = resultArr;
      postMessage({ result: results, race });
    });
  } catch (error) {
    postMessage({ error });
  }
};
