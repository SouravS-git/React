import { useState } from 'react';

import Counter from './components/Counter/Counter.jsx';
import Header from './components/Header.jsx';
import { log } from './log.js';
import ConfigureCounter from "./components/Counter/ConfigureCounter.jsx";

function App() {
  log('<App /> rendered', 1);

  const [chosenCount, setChosenCount] = useState(0);

  function handleSetCount(newCount) {
    setChosenCount(newCount);   // 10
    setChosenCount(chosenCount + 1);    // 1
    setChosenCount(chosenCount + 1);    // 1
    setChosenCount((prevChosenCount) => prevChosenCount + 1);   // 2
    setChosenCount((prevChosenCount) => prevChosenCount + 1);   // 3
    console.log(chosenCount);   // 0
  }

  return (
    <>
      <Header />
      <main>
        <ConfigureCounter onSet={handleSetCount} />
        <Counter key={chosenCount} initialCount={chosenCount} />
        <Counter initialCount={0} />
      </main>
    </>
  );
}

export default App;
