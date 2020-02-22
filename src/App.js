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

  const [lastItem, setLastItem] = useState({
    row:  null,
    col: null,
  })

    
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

    const undo = () => {
      const newGrid = [...grid];
      newGrid[lastItem.row][lastItem.col] = '0'
      setGrid(newGrid)
    }

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
            setLastItem={setLastItem}
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
            undo={undo}
          />
        </div>
      </div>
    );
  }

export default App;
