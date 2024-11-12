import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './raceFormat.module.css';

export const RaceFormat = (): JSX.Element => {
  const raceFormats = useRef(['The duel', 'Sortathon']);
  const navigate = useNavigate();

  const handleFormatSelection = (type: string) => {
    if (type === raceFormats.current[0]) {
      navigate('/duel');
    } else {
      navigate('/sortathon');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Choose race style</h1>
      {raceFormats.current.map((race) => {
        return (
          <div onClick={() => handleFormatSelection(race)} key={race} className={`${styles.raceTypeCard}`}>
            <p>{race}</p>
          </div>
        );
      })}
    </div>
  );
};
