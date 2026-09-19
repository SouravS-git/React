import quizCompleteImg from "../assets/quiz-complete.png";
import QUESTIONS from "../questions.js";

export default function Summary({userAnswers}) {

  const skippedAnswers = userAnswers.filter(answer => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswerPercentage = Math.round((skippedAnswers.length / userAnswers.length) * 100);
  const correctAnswerPercentage = Math.round((correctAnswers.length / userAnswers.length) * 100);
  const wrongAnswerPercentage = 100 - skippedAnswerPercentage - correctAnswerPercentage;

  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="quiz complete" />
      <h2>Quiz completed!</h2>
      <div id="summary-stats">
        <p>
          <span className="number">{skippedAnswerPercentage}%</span>
          <span className="text">skipped</span>
        </p>
        <p>
          <span className="number">{correctAnswerPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswerPercentage}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      <ol>
        {userAnswers.map((answer, index) => {
          let cssClasses = 'user-answer';

          if(answer === null) {
            cssClasses += ' skipped';
          }else if(answer === QUESTIONS[index].answers[0]) {
            cssClasses += ' correct';
          }else {
            cssClasses += ' wrong';
          }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{QUESTIONS[index].text}</p>
              <p className={cssClasses}>{answer ?? 'Skipped'}</p>
            </li>
          )
        })}
      </ol>
    </div>
  );
}