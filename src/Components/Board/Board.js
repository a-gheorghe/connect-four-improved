import React, { useEffect, useState } from "react";
import Cell from "../Cell";
import styles from './Board.module.css';

const Board = props => {
  const {
    numRows, numColumns, turn, setTurn,
    gameOver, setGameOver, grid, setGrid,
    createTable, setLastItem
  } = props;
  const [numConnect, setNumConnect] = useState(4);
  const [colHovered, setColHovered] = useState(null);

  const addChip = (colIndex) => {
    const newGrid = [...grid];

    for (let row = numRows - 1; row >= 0; row--) {
      if (grid[row][colIndex] === "0") {
        newGrid[row][colIndex] = turn;
        setLastItem({
          row: row,
          col: colIndex
        })
        setGrid(newGrid);
        return;
      }
    }
  }

  const removeChip = (colIndex, rowIndex) => {
    const newGrid = [...grid];
    let currentRow = rowIndex
    let prevRow = rowIndex - 1;
    while (
        currentRow < numRows &&
        prevRow >= -1 &&
        colIndex < numColumns &&
        colIndex >= 0 &&
        newGrid[currentRow][colIndex] !== "0"
      ) {
      if (currentRow === 0 || prevRow === -1 || newGrid[prevRow][colIndex] === "0") {
        newGrid[currentRow][colIndex] = "0"
      } else {
        newGrid[currentRow][colIndex] = newGrid[prevRow][colIndex];
        currentRow--
        prevRow--
    }
  }
  setGrid(newGrid);
}

  /* Update the grid on each chip drop:
    If clicking on a cell where a chip exists, remove it
    Otherwise, drop chip to bottom of column */
  const dropChip = (colIndex, rowIndex) => {
    if (grid[rowIndex][colIndex] !== "0") {
      return removeChip(colIndex, rowIndex);
    } else {
      return addChip(colIndex);
    }
  };

  const onHover = colIndex => {
    setColHovered(colIndex);
  }

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
                direction: "vertical",
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
                direction: "horizontal",
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
                direction: "diagonal",
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
                direction: "diagonal",
                winner: turn
              });
            return;
          }
        }
      }
    }
  };

  const checkDraw = () => {
    for (let row = 0; row < numRows; row++) {
      for (let col = 0; col < numColumns; col++) {
        if (grid[row][col] === "0") {
          return false
        }
      }
    }
    return true;
  }

  /* Check result is called in the useEffect each time the grid changes */
  const checkResult = () => {
    if (grid.length) {
      verticalWin();
      horizontalWin();
      diagonalUpWin();
      diagonalDownWin();

      // function that checks if its a draw
      checkDraw() && alert(`It's a draw!`) 
    }
  }

  const playTurn = (colIndex, rowIndex) => {
    dropChip(colIndex, rowIndex);
  };

  const changeTurn = () => {
    // if parseInt(turn) === totalPlayers {
     // newTurn = '1'
    //}
    // newTurn = parseInt(turn) + 1
    // setTurn(newTurn)
    turn === "1" ? setTurn("2") :
    turn === "2" ? setTurn("3") :
    setTurn("1");
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
    <div className={styles.container}>
      <table className={styles.table}>
          <tbody>
              {grid.map((row, rowIndex) => (
              <tr className={styles.row} key={rowIndex}>
                  {row.map((cell, colIndex) => (
                  <Cell
                      isHovered={colHovered === colIndex}
                      rowIndex={rowIndex}
                      colIndex={colIndex}
                      key={colIndex}
                      val={grid[rowIndex][colIndex]}
                      turn={turn}
                      onClick={
                        gameOver.gameOver ? () => {} : () => playTurn(colIndex, rowIndex)
                      }
                      onHover={onHover}
                  />
                  ))}
              </tr>
              ))}
          </tbody>
      </table>
      <svg className={styles.leftFoot} width="113" height="96" viewBox="0 0 113 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1" fill="white">
        <path fillRule="evenodd" clipRule="evenodd" d="M73 7.87679C73 3.52656 69.4734 0 65.1232 0H47.3768C43.0266 0 39.5 3.52657 39.5 7.87682C38.8121 29.1493 32.5535 60.0816 12.0902 68.8213C5.79218 71.5111 0 76.7517 0 83.6C0 90.4483 5.55167 96 12.4 96H39.5H73H100.1C106.948 96 112.5 90.4483 112.5 83.6C112.5 76.7517 106.708 71.5111 100.41 68.8213C79.9465 60.0816 73.6879 29.1493 73 7.87679Z"/>
        </mask>
        <path fillRule="evenodd" clipRule="evenodd" d="M73 7.87679C73 3.52656 69.4734 0 65.1232 0H47.3768C43.0266 0 39.5 3.52657 39.5 7.87682C38.8121 29.1493 32.5535 60.0816 12.0902 68.8213C5.79218 71.5111 0 76.7517 0 83.6C0 90.4483 5.55167 96 12.4 96H39.5H73H100.1C106.948 96 112.5 90.4483 112.5 83.6C112.5 76.7517 106.708 71.5111 100.41 68.8213C79.9465 60.0816 73.6879 29.1493 73 7.87679Z" fill="#1659A9"/>
        <path d="M100.41 68.8213L96.4822 78.0177L100.41 68.8213ZM65.1232 -10H47.3768V10H65.1232V-10ZM16.0178 78.0177C29.9387 72.0722 37.9838 59.0875 42.6003 46.4896C47.2898 33.6925 49.1291 19.5081 49.4948 8.20003L29.5052 7.5536C29.183 17.5181 27.549 29.4361 23.8214 39.6081C20.0209 49.9794 14.7049 56.8307 8.16248 59.6249L16.0178 78.0177ZM39.5 86H12.4V106H39.5V86ZM39.5 106H73V86H39.5V106ZM73 106H100.1V86H73V106ZM104.338 59.6249C97.7951 56.8307 92.4791 49.9794 88.6786 39.6081C84.951 29.436 83.317 17.518 82.9948 7.55357L63.0052 8.2C63.3709 19.5081 65.2102 33.6925 69.8997 46.4896C74.5162 59.0875 82.5612 72.0722 96.4822 78.0177L104.338 59.6249ZM122.5 83.6C122.5 70.686 111.953 62.8774 104.338 59.6249L96.4822 78.0177C98.5878 78.917 100.299 80.127 101.359 81.313C102.361 82.4355 102.5 83.1795 102.5 83.6H122.5ZM100.1 106C112.471 106 122.5 95.9712 122.5 83.6H102.5C102.5 84.9255 101.425 86 100.1 86V106ZM8.16248 59.6249C0.547025 62.8774 -10 70.686 -10 83.6H10C10 83.1795 10.1386 82.4355 11.1412 81.313C12.2007 80.127 13.9122 78.917 16.0178 78.0177L8.16248 59.6249ZM47.3768 -10C37.5037 -10 29.5 -1.99627 29.5 7.87682H49.5C49.5 9.04942 48.5494 10 47.3768 10V-10ZM-10 83.6C-10 95.9712 0.0288145 106 12.4 106V86C11.0745 86 10 84.9255 10 83.6H-10ZM83 7.87679C83 -1.99629 74.9963 -10 65.1232 -10V10C63.9506 10 63 9.0494 63 7.87679H83Z" fill="#0C458A" mask="url(#path-1-inside-1)"/>
      </svg>
      <svg className={styles.rightFoot} width="113" height="96" viewBox="0 0 113 96" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-1-inside-1" fill="white">
        <path fillRule="evenodd" clipRule="evenodd" d="M73 7.87679C73 3.52656 69.4734 0 65.1232 0H47.3768C43.0266 0 39.5 3.52657 39.5 7.87682C38.8121 29.1493 32.5535 60.0816 12.0902 68.8213C5.79218 71.5111 0 76.7517 0 83.6C0 90.4483 5.55167 96 12.4 96H39.5H73H100.1C106.948 96 112.5 90.4483 112.5 83.6C112.5 76.7517 106.708 71.5111 100.41 68.8213C79.9465 60.0816 73.6879 29.1493 73 7.87679Z"/>
        </mask>
        <path fillRule="evenodd" clipRule="evenodd" d="M73 7.87679C73 3.52656 69.4734 0 65.1232 0H47.3768C43.0266 0 39.5 3.52657 39.5 7.87682C38.8121 29.1493 32.5535 60.0816 12.0902 68.8213C5.79218 71.5111 0 76.7517 0 83.6C0 90.4483 5.55167 96 12.4 96H39.5H73H100.1C106.948 96 112.5 90.4483 112.5 83.6C112.5 76.7517 106.708 71.5111 100.41 68.8213C79.9465 60.0816 73.6879 29.1493 73 7.87679Z" fill="#1659A9"/>
        <path d="M100.41 68.8213L96.4822 78.0177L100.41 68.8213ZM65.1232 -10H47.3768V10H65.1232V-10ZM16.0178 78.0177C29.9387 72.0722 37.9838 59.0875 42.6003 46.4896C47.2898 33.6925 49.1291 19.5081 49.4948 8.20003L29.5052 7.5536C29.183 17.5181 27.549 29.4361 23.8214 39.6081C20.0209 49.9794 14.7049 56.8307 8.16248 59.6249L16.0178 78.0177ZM39.5 86H12.4V106H39.5V86ZM39.5 106H73V86H39.5V106ZM73 106H100.1V86H73V106ZM104.338 59.6249C97.7951 56.8307 92.4791 49.9794 88.6786 39.6081C84.951 29.436 83.317 17.518 82.9948 7.55357L63.0052 8.2C63.3709 19.5081 65.2102 33.6925 69.8997 46.4896C74.5162 59.0875 82.5612 72.0722 96.4822 78.0177L104.338 59.6249ZM122.5 83.6C122.5 70.686 111.953 62.8774 104.338 59.6249L96.4822 78.0177C98.5878 78.917 100.299 80.127 101.359 81.313C102.361 82.4355 102.5 83.1795 102.5 83.6H122.5ZM100.1 106C112.471 106 122.5 95.9712 122.5 83.6H102.5C102.5 84.9255 101.425 86 100.1 86V106ZM8.16248 59.6249C0.547025 62.8774 -10 70.686 -10 83.6H10C10 83.1795 10.1386 82.4355 11.1412 81.313C12.2007 80.127 13.9122 78.917 16.0178 78.0177L8.16248 59.6249ZM47.3768 -10C37.5037 -10 29.5 -1.99627 29.5 7.87682H49.5C49.5 9.04942 48.5494 10 47.3768 10V-10ZM-10 83.6C-10 95.9712 0.0288145 106 12.4 106V86C11.0745 86 10 84.9255 10 83.6H-10ZM83 7.87679C83 -1.99629 74.9963 -10 65.1232 -10V10C63.9506 10 63 9.0494 63 7.87679H83Z" fill="#0C458A" mask="url(#path-1-inside-1)"/>
      </svg>
    </div>    
  );
};

export default Board;
