import {useState} from "react";
import {WINNING_COMBINATIONS} from "./winning-combinations.js";
import Player from "./components/Player.jsx";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  let currentPlayer = 'X';

  if (turns.length > 0 && turns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = INITIAL_GAME_BOARD.map(row => [...row]);

  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = undefined;

  for (const winningCombination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[winningCombination[0].row][winningCombination[0].column];
    const secondSquareSymbol = gameBoard[winningCombination[1].row][winningCombination[1].column];
    const thirdSquareSymbol = gameBoard[winningCombination[2].row][winningCombination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  let activePlayer = deriveActivePlayer(gameTurns);
  const [players, setPlayers] = useState(PLAYERS);

  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      return [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns
      ];
    });
  }

  function handleRestartGame() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, name) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === 'X'}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            name={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === 'O'}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} restartGame={handleRestartGame}/>}
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      </div>
      <Log
        turns={gameTurns}
      />
    </main>
  );
}

export default App