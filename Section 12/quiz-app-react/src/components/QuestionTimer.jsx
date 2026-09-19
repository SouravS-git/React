import {useEffect, useState} from "react";

export default function QuestionTimer({timeout, onTimeout, mode}) {
  const [remainingTime, setRemainingTime] = useState();

  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);
    return () => {
      clearTimeout(timer);
    }
  }, [timeout, onTimeout]);

  useEffect(() => {
    setRemainingTime(timeout);

    const interval = setInterval(() => {
      setRemainingTime(prevRemainingTime => prevRemainingTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <progress
      id="question-time"
      max={timeout}
      value={remainingTime}
      className={mode}
    />
  );
}