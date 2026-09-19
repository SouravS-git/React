import {useRef} from "react";

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
  const shuffledAnswers = useRef();

  if(!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers].sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map(answer => {
        let cssClasses = '';
        let isSelected = answer === selectedAnswer;

        if(isSelected && answerState === 'answered') {
          cssClasses = 'selected';
        }

        if(isSelected && (answerState === 'correct' || answerState === 'wrong')) {
          cssClasses = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClasses}
              disabled={answerState !== ''}
            >
              {answer}
            </button>
          </li>
        )
      })}
    </ul>
  );
}