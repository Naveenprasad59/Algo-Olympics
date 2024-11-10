import { useEffect, useRef, useState } from 'react';

import Button from '../common/button';

import styles from './SortRace.module.css';

import { RenderWhen } from '../HOC/RenderWhen';
import { RaceResults } from './RaceResults';

enum SORT_RACE_TYPES {
  SMALL,
  MEDIUM,
  LARGE,
  MARATHON,
}

export type PlaceType = { name: string; time: number };

export const SortRace = (): JSX.Element => {
  const raceNames = useRef({
    [SORT_RACE_TYPES.SMALL]: 'Small (1000 elements)',
    [SORT_RACE_TYPES.MEDIUM]: 'Medium (10000 elements)',
    [SORT_RACE_TYPES.LARGE]: 'Large (100000 elements)',
    [SORT_RACE_TYPES.MARATHON]: 'Marathon (10000000 elements)',
  });

  const races = useRef([
    SORT_RACE_TYPES.SMALL,
    SORT_RACE_TYPES.MEDIUM,
    SORT_RACE_TYPES.LARGE,
    SORT_RACE_TYPES.MARATHON,
  ]);

  const raceSize = useRef({
    [SORT_RACE_TYPES.SMALL]: 1000,
    [SORT_RACE_TYPES.MEDIUM]: 10000,
    [SORT_RACE_TYPES.LARGE]: 100000,
    [SORT_RACE_TYPES.MARATHON]: 10000000,
  });

  const workerRef = useRef<Worker | null>(null);

  const [raceStarted, setRaceStarted] = useState(false);
  const [raceLoading, setRaceLoading] = useState(false);

  const [results, setResults] = useState<PlaceType[]>([]);

  const [type, setType] = useState(SORT_RACE_TYPES.SMALL);

  const onSelectRaceType = (selectedType: SORT_RACE_TYPES) => {
    setType(selectedType);
  };

  const onStartRace = () => {
    setRaceStarted(true);
    setRaceLoading(true);
    // Running on worker thread
    // const workerInstance = createWebWorker(worker);
    const workerInstance = new Worker(new URL('../../worker/script.ts', import.meta.url), { type: 'module' });
    workerRef.current = workerInstance;
    workerInstance.addEventListener('message', (event) => {
      const result = event.data as unknown as { result: PlaceType[] };
      setResults(result.result);
      setRaceLoading(false);
    });
    workerInstance.postMessage({ numberOfElements: raceSize.current[type] });
  };

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  return (
    <div className={styles.container}>
      <p className={styles.raceHeading}>Choose race format</p>
      <main className={styles.mainSection}>
        <RenderWhen renderIf={!raceStarted}>
          <>
            <div className={styles.raceTypesContainer}>
              {races.current.map((race) => {
                return (
                  <div
                    key={race}
                    className={`${styles.raceTypeCard} ${type === race ? styles.selectedRaceTypeCard : ''}`}
                    onClick={() => onSelectRaceType(race)}
                  >
                    <p>{raceNames.current[race]}</p>
                  </div>
                );
              })}
            </div>

            <Button onClick={onStartRace}>Start Race</Button>
          </>
        </RenderWhen>
        <RenderWhen renderIf={raceStarted}>
          <RenderWhen renderIf={raceLoading}>
            <div className={styles.raceLoading}>Loading</div>
          </RenderWhen>
          <RenderWhen renderIf={!raceLoading}>
            <RaceResults results={results} />
          </RenderWhen>
        </RenderWhen>
      </main>
    </div>
  );
};
