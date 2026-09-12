import logo from '../../assets/logo.png';
// import './Header.css';
import styles from './Header.module.css';

export default function Header() {
  let flag = true;

  return (
    <header>
      <img src={logo} alt="A canvas" />
      <h1>ReactArt</h1>
      <p>A community of artists and art-lovers.</p>
      <p className="---------">A community of artists and art-lovers.</p>
      <p className="paragraph">A community of artists and art-lovers.</p>

      <p className={styles.paragraph}>A community of artists and art-lovers.</p>

      <p style={{
        color: 'white',
        backgroundColor: 'black',
        padding: '10px',
      }}>
        This is a dummy paragraph styled with inline-css.
      </p>
      <p className={flag ? styles.paragraph : undefined}>Hello</p>
      <p style={flag ? {color : "white"} : undefined}>Hello</p>
    </header>
  );
}
