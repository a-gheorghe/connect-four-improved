import React, { useState } from 'react';
import Board from './Components/Board';
import Sidebar from './Components/Sidebar';
import styles from './App.module.css';

const App = () => {
  const [numRows, setNumRows] = useState(6);
  const [numColumns, setNumColumns] = useState(7);
  const [turn, setTurn] = useState("1");
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    direction: null,
    winner: null
  });
    
    const createTable = () => {
      const table = [];
      for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numColumns; j++) {
          row.push("0");
        }
        table.push(row);
      }
      setGrid(table);
    };
  
    
    const resetGame = () => {
      setGameOver(false);
      createTable();
    };

    return (
      <div className={styles.app}>
        <div className={styles.gameContainer}>
          <Board 
            numRows={numRows}
            numColumns={numColumns}
            turn={turn}
            setTurn={setTurn}
            gameOver={gameOver}
            setGameOver={setGameOver}
            grid={grid}
            setGrid={setGrid}
            createTable={createTable}
          />
        </div>
        <div className={styles.sidebarContainer}>
          <Sidebar
            resetGame={resetGame}
            className={styles.sidebarContainer}
            numRows={numRows}
            numColumns={numColumns}
            setNumRows={setNumRows}
            setNumColumns={setNumColumns}
            turn={turn}
            gameOver={gameOver}
          />
        </div>
      </div>
    );
  }

export default App;
