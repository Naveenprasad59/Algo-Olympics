import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { SortRace } from './components/Sorting/SortRace';

import './App.css';

const App = (): JSX.Element => {
  return (
    <div className="mainContainer">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SortRace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
