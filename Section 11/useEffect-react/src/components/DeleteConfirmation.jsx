import {useEffect} from "react";
import ProgressBar from "./ProgressBar.jsx";

const TIMER = 3000;
export default function DeleteConfirmation({ onConfirm, onCancel }) {
  useEffect(() => {
    console.log('TIMER SET');
    const timer = setTimeout(() => {
      onConfirm();
    }, 3000);
    return () => {
      console.log('TIMER CLEARED');
      clearTimeout(timer);
    }
  }, [onConfirm]);

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      {/* Outsourcing the ProgressBar component to a separate file because it'll optimize the performance by not rendering this DeleteConfirmation in every 10 milliseconds and therefore it'll also prevent comparing onConfirm depencendy on every render.*/}
      <ProgressBar timer={TIMER}></ProgressBar>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
