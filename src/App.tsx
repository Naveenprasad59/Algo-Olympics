import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SortOlympics } from './pages/1v1';

import './App.css';
import { RaceFormat } from './pages/raceFormat';
import { SortRace } from './pages/Sorting/SortRace';

const App = (): JSX.Element => {
  return (
    <div className="mainContainer">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RaceFormat />} />
          <Route path="/duel" element={<SortOlympics />} />
          <Route path="/sortathon" element={<SortRace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
