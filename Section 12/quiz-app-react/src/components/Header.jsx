import appLogo from '../assets/quiz-logo.png'

export default function Header() {
  return (
    <header>
      <h1>ReactQuiz</h1>
      <img src={appLogo} alt="app logo"/>
    </header>
  );
}