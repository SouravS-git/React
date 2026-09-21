import {useCallback, useState, useMemo, useEffect} from 'react';

import IconButton from '../UI/IconButton.jsx';
import MinusIcon from '../UI/Icons/MinusIcon.jsx';
import PlusIcon from '../UI/Icons/PlusIcon.jsx';
import CounterOutput from './CounterOutput.jsx';
import { log } from '../../log.js';
import CounterHistory from "./CounterHistory.jsx";

function isPrime(number) {
  log(
    'Calculating if is prime number',
    2,
    'other'
  );
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter = function Counter({ initialCount }) {
  log('<Counter /> rendered', 1);

  // A better efficient way than using useEffect is to re-mount the component upon the initialCount change by using key special prop.
  // Because the dependency of useEffect will be checked every time the component is re-rendered, and if the dependency is changed, the useEffect will be executed after the component finishes its execution. And then again useEffect will change the state of the counterChange which will cause the component to be re-rendered again.
  /*useEffect(() => {
    setCounterChanges([{id: Math.random() * 1000, value: initialCount}]);
  }, [initialCount]);
  const [counterChanges, setCounterChanges] = useState([]);*/

  // useMemo() also works like memo() but it it used on a performance intensive function. Instead of executing the function every time the component is rendered, it will only execute the function when the component is mounted or when the dependencies change during re-rendering.
  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  // const [counter, setCounter] = useState(initialCount);
  const [counterChanges, setCounterChanges] = useState([{id: Math.random() * 1000, value: initialCount}]);

  const currentCounter = counterChanges.reduce((acc, cur) => acc + cur.value, 0);

  // This callback hook will avoid recreating the function every time the component is rendered. So, if we pass it to any other child component as a prop, it will not be changed even if the parent component is re-rendered.
  const handleDecrement = useCallback(function handleDecrement() {
    // setCounter((prevCounter) => prevCounter - 1);
    setCounterChanges((prevCounterChanges) => [{id: Math.random() * 1000, value: -1}, ...prevCounterChanges]);
  }, []);

  const handleIncrement = useCallback(() => {
    // setCounter((prevCounter) => prevCounter + 1);
    setCounterChanges((prevCounterChanges) => [{id: Math.random() * 1000, value: +1}, ...prevCounterChanges]);
  }, []);

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{' '}
        <strong>is {initialCountIsPrime ? 'a' : 'not a'}</strong> prime number.
      </p>
      <p>
        {/*handleDecrement is a callback function passed as a prop to the IconButton component, so it will not be recreated every time the parent component is rendered. */}
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput
          value={currentCounter}
        />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>
      <CounterHistory history={counterChanges} />
    </section>
  );
};

export default Counter;
