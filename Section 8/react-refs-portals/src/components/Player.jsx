import { useState, useRef } from "react";

export default function Player() {
  const playerNameRef = useRef();
  const [playerName, setPlayerName] = useState();

  function handleSetName() {
    setPlayerName(playerNameRef.current.value);
  }

  function handleClearName(){
    setPlayerName('');
    playerNameRef.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {playerName || 'Unknown entity'}</h2>
      <p>
        <input ref={playerNameRef} type="text" />
        <button onClick={handleSetName}>Set Name</button>
        {/*<button onClick={handleClearName}>Clear Name</button>*/}
      </p>
    </section>
  );
}
