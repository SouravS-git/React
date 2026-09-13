import {useRef, useState} from "react";
import ResultModal from "./ResultModal.jsx";

export default function TimerChallenge({ title, targetTime }) {
  let timer = useRef();
  let dialog = useRef();

  /*const [timerStarted, setTimerStarted] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);

    function handleStartTimer(){
      timer.current = setTimeout(() => {
        setTimerExpired(true);

        // dialog.current.showModal();
          // This works but here showModal() function depends on ResultModal component.
          // If other developer changes the dialog to a div in ResultModal, that will break this component.

        dialog.current.open();

        }, targetTime * 1000);

      setTimerStarted(true);
    }*/

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const isTimerActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  if(timeRemaining <= 0){
    handleStopTimer();
  }

  function handleStartTimer(){
    timer.current = setInterval(() => {
      setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
    }, 10);
  }

  function handleStopTimer(){
    dialog.current.open();
    clearInterval(timer.current);
  }

  function handleReset(){
    setTimeRemaining(targetTime * 1000);
  }

  return (
    <>
      <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} onReset={handleReset} />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={isTimerActive ? handleStopTimer : handleStartTimer}>
            {isTimerActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={isTimerActive ? 'active' : ''}>
          {isTimerActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}