import { useRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export default function ResultModal({ref, targetTime, remainingTime, onReset}){
  const dialog = useRef();

  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  useImperativeHandle(ref, () => {
    return {
      open(){
        dialog.current.showModal();
      }
    }
  });

  // Portal is a React feature that allows us to render a component outside the DOM hierarchy of the parent component.
  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You lost</h2>}
      {!userLost && <h2>Your score: {score}</h2>}
      <p>The target time was <strong>{targetTime}</strong> seconds.</p>
      <p>you stopped the timer with{' '}<strong>{formattedRemainingTime} seconds left.</strong></p>
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>, document.getElementById('modal'));
}

// For older versions (< 19) of React, we can't directly pass ref to the components -
// This also works on React 19

/*
import { forwardRef } from "react";

const ResultModal = forwardRef(function ResultModal({result, targetTime}, ref){
  return (
    <dialog ref={ref} className="result-modal">
      <h2>You {result}</h2>
      <p>The target time was <strong>{targetTime}</strong> seconds.</p>
      <p>you stopped the timer with <strong>X seconds left.</strong></p>
      <form method="dialog">
        <button>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;*/
