import { PlaceType } from './SortRace';

import styles from './SortRace.module.css';

export const RaceResults = ({ results }: { results: PlaceType[] }): JSX.Element => {
  return (
    <div className={styles.raceTypesContainer}>
      {results.map((result) => (
        <div key={result.name} className={styles.raceResult}>
          <p>
            {result.name} - {result.time}
          </p>
        </div>
      ))}
    </div>
  );
};
