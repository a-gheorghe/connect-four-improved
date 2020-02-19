import React, { useEffect, useState } from "react";
import Cell from "../Cell";
import Announcement from "../Announcement";
import TurnStatus from "../TurnStatus";
import UserInput from "../UserInput";
import styles from './Board.module.css';

const Board = () => {
  const [numRows, setNumRows] = useState(6);
  const [numColumns, setNumColumns] = useState(7);
  const [numConnect, setNumConnect] = useState(4);
  const [grid, setGrid] = useState([]);
  const [turn, setTurn] = useState("1");
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

  /* Update the grid on each chip drop. If no space, let user know */
  const dropChip = colIndex => {
    for (let row = numRows - 1; row >= 0; row--) {
      if (grid[row][colIndex] === "0") {
        const newGrid = [...grid];
        newGrid[row][colIndex] = turn;
        setGrid(newGrid);
        return;
      }
    }
    alert("no more space in this column");
  };

  /* The following 4 functions are to determine whether there are 4
  chips of the same type in a row in a given direction: vertical, horizontal,
  diagonalUp, and diagonalDown */
  const verticalWin = () => {
    let row = 0;
    let col = 0;
    let current = null;
    for (col = 0; col < numColumns; col++) {
      let occupiedBy;
      let count = 0;
      for (row = 0; row < numRows; row++) {
        current = grid[row][col];
        if (current !== "0") {
          if (current === occupiedBy) {
            count++;
            if (count === numConnect) {
              setGameOver({
                gameOver: true,
                direction: "vertically",
                winner: occupiedBy
              });
              return;
            }
          } else {
            occupiedBy = current;
            count = 1;
          }
        } else {
          occupiedBy = current;
          count = 0;
        }
      }
    }
  }

  const horizontalWin = () => {
    let row = 0;
    let col = 0;
    let current = null;
    for (row = 0; row < numRows; row++) {
      let occupiedBy;
      let count = 0;
      for (col = 0; col < numColumns; col++) {
        current = grid[row][col];
        if (current !== "0") {
          if (occupiedBy === current) {
            count++;
            if (count === numConnect) {
              setGameOver({
                gameOver: true,
                direction: "horizontally",
                winner: occupiedBy
              });
              return;
            }
          } else {
            occupiedBy = current;
            count = 1;
          }
        } else {
          occupiedBy = "0";
          count = 0;
        }
      }
    }
  }

  const diagonalUpWin = () => {
    let current = null;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        current = grid[row][col];
        if (current === turn) {
          if (
            row + numConnect - 1 < numRows &&
            col + numConnect - 1 < numColumns
          ) {
            let win = true;
            for (let i = 1; i < numConnect; i++) {
              if (grid[row + i][col + i] !== turn) {
                win = false;
                break;
              }
            }

            win &&
              setGameOver({
                gameOver: true,
                direction: "diagonally from top left to bottom right",
                winner: turn
              });
            return;
          }
        }
      }
    }
  }

  const diagonalDownWin = () => {
    let current = null;
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        current = grid[row][col];
        if (current === turn) {
          if (
            row + numConnect - 1 < numRows &&
            col - numConnect - 1 < numColumns
          ) {
            let win = true;
            for (let i = 1; i < numConnect; i++) {
              if (grid[row + i][col - i] !== turn) {
                win = false;
                break;
              }
            }

            win &&
              setGameOver({
                gameOver: true,
                direction: "diagonally from top right to bottom left",
                winner: turn
              });
            return;
          }
        }
      }
    }
  };

  /* Check result is called in the useEffect each time the grid changes */
  const checkResult = () => {
    if (grid.length) {
      verticalWin();
      horizontalWin();
      diagonalUpWin();
      diagonalDownWin();
    }
  }

  const playTurn = colIndex => {
    dropChip(colIndex);
  };

  const changeTurn = () => {
    turn === "1" ? setTurn("2") : setTurn("1");
  };

  const resetGame = () => {
    setGameOver(false);
    createTable();
  };


  useEffect(() => {
    createTable();
  }, [numRows, numColumns, numConnect]);

  useEffect(() => {
    checkResult();
  }, [grid]);

  useEffect(() => {
    if (!gameOver.gameOver) {
      changeTurn();
    }
  }, [grid]);

  return (
    <React.Fragment>
      <div className={styles.container}>
        <table className={styles.table}>
            <caption className={styles.caption}>Connect Four</caption>
            <tbody>
                {grid.map((row, rowIndex) => (
                <tr className={styles.row} key={rowIndex}>
                    {row.map((cell, colIndex) => (
                    <Cell
                        rowIndex={rowIndex}
                        colIndex={colIndex}
                        key={colIndex}
                        val={grid[rowIndex][colIndex]}
                        onClick={
                        gameOver.gameOver ? () => {} : () => playTurn(colIndex)
                        }
                    />
                    ))}
                </tr>
                ))}
            </tbody>
        </table>
        <div className={styles.customizeContainer}>
          <h2 className={styles.customize}>Customize the board</h2>
          <UserInput min="4" max="20" value={numRows} onChange={e => setNumRows(e.target.value)} label="Choose number of rows" />
          <UserInput min="4" max="20" value={numColumns} onChange={e => setNumColumns(e.target.value)} label="Choose number of columns" />
          {/* Wanted to be able to let the user dynamically choose how many items needed to be connected - not working completely so commenting out */}
          {/* <UserInput value={numConnect} onChange={e => setNumConnect(e.target.value)} label="Choose how many items to connect" /> */}
        </div>
        </div>
        <TurnStatus turn={turn} gameOver={gameOver} />
        <Announcement gameOver={gameOver} resetGame={resetGame} />
    </React.Fragment>
  );
};

export default Board;
