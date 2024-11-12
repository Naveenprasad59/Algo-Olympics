import { useCallback, useEffect, useState } from 'react';

import { RenderWhen } from '../../../components/HOC/RenderWhen';

import styles from '../sortolympics.module.css';
import { SORT_KEYS } from '../constants';
import { PlaceType } from '../../Sorting/SortRace';

type RaceCardProps = {
  raceName: string;
  algoNames: SORT_KEYS[];
  hasStarted: boolean;
  onRaceEnd: (winner: SORT_KEYS) => void;
};

export const RaceCard = ({ raceName, algoNames, hasStarted: startRace, onRaceEnd }: RaceCardProps): JSX.Element => {
  const sortingNameMap = {
    [SORT_KEYS.BOGO]: 'Bogo Sort',
    [SORT_KEYS.BUBBLE]: 'Bubble Sort',
    [SORT_KEYS.HEAP]: 'Heap Sort',
    [SORT_KEYS.INBUILT]: 'Inbuilt Sort',
    [SORT_KEYS.INSERTION]: 'Insetion Sort',
    [SORT_KEYS.MERGE]: 'Merge Sort',
    [SORT_KEYS.QUICK]: 'Quick Sort',
    [SORT_KEYS.RADIX]: 'Radix Sort',
  };
  const [raceLoading, setRaceLoading] = useState(false);
  const [winner, setWinner] = useState<SORT_KEYS | null>(null);
  const [isRaceOver, setIsRaceOver] = useState(false);

  const handleWorkerMessage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (event: MessageEvent<any>) => {
      const result = event.data as unknown as { result: PlaceType[]; race: string };
      setWinner(result.result[0].name);
      setRaceLoading(false);
      setIsRaceOver(true);
      onRaceEnd(result.result[0].name);
    },
    [onRaceEnd],
  );

  useEffect(() => {
    setIsRaceOver(false);
    setWinner(null);
  }, [algoNames]);

  useEffect(() => {
    let workerInstance: Worker | null = null;
    if (startRace) {
      setRaceLoading(true);
      workerInstance = new Worker(new URL('../../../worker/script.ts', import.meta.url), { type: 'module' });
      workerInstance.addEventListener('message', handleWorkerMessage);
      workerInstance.postMessage({
        numberOfElements: 10000,
        sortingAlgoKeys: algoNames,
        race: raceName,
      });
    }

    return () => {
      workerInstance?.removeEventListener('message', handleWorkerMessage);
      workerInstance?.terminate();
    };
  }, [startRace, algoNames, raceName, handleWorkerMessage]);

  return (
    <section className={styles.raceSectionWrapper}>
      <p className={styles.raceSectionHeader}>{raceName}</p>
      <div className={styles.raceSection}>
        <hr className={styles.raceHrule} />
        <div className={styles.raceCard}>
          <p className={styles.raceText}>{sortingNameMap[algoNames[0]]}</p>
        </div>
        <div className={styles.raceWinnerCircle}>
          <RenderWhen renderIf={isRaceOver}>
            <p>Winner: {sortingNameMap[winner ?? SORT_KEYS.MERGE]}</p>
          </RenderWhen>
          <RenderWhen renderIf={!isRaceOver}>
            <RenderWhen renderIf={!startRace}>
              <p>About to Start</p>
            </RenderWhen>
            <RenderWhen renderIf={raceLoading}>
              <p>Loading..</p>
            </RenderWhen>
          </RenderWhen>
        </div>
        <div className={styles.raceCard}>
          <p className={styles.raceText}>{sortingNameMap[algoNames[1]]}</p>
        </div>
      </div>
    </section>
  );
};
