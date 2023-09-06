import React, { useState, useEffect } from "react";

import { Board } from "./components/Board";
import { ResetButton } from "./components/ResetButton";
import { RestartButton } from "./components/Restart";
import { ScoreBoard } from "./components/ScoreBoard";
import "./App.css";

const App = () => {
  const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const [xPlaying, setXPlaying] = useState(true);
  const [board, setBoard] = useState(Array(9).fill(null));
  // const [scores, setScores] = useState({ xScore: 0, oScore: 0 });
  let [oScore, setoScore] = useState(0);
  let [xScore, setxScore] = useState(0);
  console.log("xScore-set"+xScore);
  console.log("oScore-set"+oScore);

  const [gameOver, setGameOver] = useState(false);

  const handleBoxClick = (boxIdx) => {
    // Step 1: Update the board
    const updatedBoard = board.map((value, idx) => {
      if (idx === boxIdx) {
        return xPlaying ? "X" : "O";
      } else {
        return value;
      }
    });

    setBoard(updatedBoard);

    // Step 2: Check if either player has won the game
    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === "O") {
        // let { oScore } = scores;
        oScore += 1;
        console.log("oScore win"+ oScore);
        localStorage.setItem("oScore", oScore); // Assign value to a key

        setoScore(oScore);
      } else {
        // let { xScore } = scores;
        xScore += 1;
        console.log("xScore win"+xScore);
        localStorage.setItem("xScore", xScore); // Assign value to a key
        const itemx = JSON.parse(localStorage.getItem("xScore"));
        console.log("itemxlocal"+itemx);
        setxScore(xScore);
      }
    }

    // Step 3: Change active player
    setXPlaying(!xPlaying);
  };

  const checkWinner = (board) => {
    for (let i = 0; i < WIN_CONDITIONS.length; i++) {
      const [x, y, z] = WIN_CONDITIONS[i];

      // Iterate through win conditions and check if either player satisfies them
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
  };
  const restartBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null));
    localStorage.clear();
    setoScore(0);
    setxScore(0);
  };

  useEffect(() => {
    const itemx = JSON.parse(localStorage.getItem("xScore"));
    const itemo = JSON.parse(localStorage.getItem("oScore"));
    console.log("itemx"+itemx);
  console.log("itemo"+itemo);
    if (itemx) {
      setxScore(itemx);
    }
    if(itemo){
      setoScore(itemo);
    }
  }, [xScore,oScore]);

  return (
    <div className="App">

      <ScoreBoard xScore={xScore} oScore={oScore} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
      <RestartButton restartBoard={restartBoard} />
    </div>
  );
};

export default App;
