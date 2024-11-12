import { useCallback, useRef, useState } from 'react';
import { produce } from 'immer';

import Button from '../../components/common/button';

import styles from './sortolympics.module.css';

import { SORT_KEYS } from './constants';
import { RaceCard } from './components/raceSection';

export const SortOlympics = (): JSX.Element => {
  // number of levels to reach final winner
  const numberOfLevels = useRef(Math.log2(8));
  const currentLevel = useRef(1);

  const [raceSchedule, setRaceSchedule] = useState<Array<SORT_KEYS[]>>([
    [SORT_KEYS.BOGO, SORT_KEYS.BUBBLE],
    [SORT_KEYS.HEAP, SORT_KEYS.INBUILT],
    [SORT_KEYS.INSERTION, SORT_KEYS.MERGE],
    [SORT_KEYS.QUICK, SORT_KEYS.RADIX],
  ]);

  const [startRace, setStartRace] = useState(false);
  const [showNextLevel, setShowNextLevel] = useState(false);

  const onStart = () => {
    setStartRace(true);
  };

  const raceWinners = useRef<SORT_KEYS[]>([]);

  const onRaceEnd = useCallback(
    (winner: SORT_KEYS) => {
      raceWinners.current.push(winner);
      if (raceWinners.current.length === raceSchedule.length && currentLevel.current < numberOfLevels.current) {
        setShowNextLevel(true);
      }
    },
    [raceSchedule.length],
  );

  const onNextLevel = () => {
    currentLevel.current += 1;
    setStartRace(false);
    setShowNextLevel(false);
    const lastRaceWinners = [...raceWinners.current];
    raceWinners.current = [];
    setRaceSchedule(
      produce((raceScheduleDraft) => {
        raceScheduleDraft = [];
        for (let index = 0; index < lastRaceWinners.length; index += 2) {
          raceScheduleDraft.push([lastRaceWinners[index], lastRaceWinners[index + 1]]);
        }

        return raceScheduleDraft;
      }),
    );
  };

  return (
    <div className={styles.container}>
      <header className={styles.headerSection}>
        <p>
          Sorting Olympics -
          {currentLevel.current === 1 ? ' Quarter finals' : currentLevel.current === 2 ? ' Semi' : ' Finals'}
        </p>
        <Button onClick={onStart}>Start Race</Button>
      </header>
      <main className={styles.mainSection}>
        {raceSchedule.map((schedule, index) => {
          return (
            <RaceCard
              key={`Race ${index}`}
              raceName={`Race ${index + 1}`}
              algoNames={schedule}
              hasStarted={startRace}
              onRaceEnd={onRaceEnd}
            />
          );
        })}
        {showNextLevel && (
          <div className={styles.center}>
            <Button onClick={onNextLevel}>Continue Race with winners</Button>
          </div>
        )}
      </main>
    </div>
  );
};
