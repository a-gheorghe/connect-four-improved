import React from 'react';
import UserInput from '../UserInput';
import TurnStatus from '../TurnStatus';
import styles from './Sidebar.module.css';

const Sidebar = ({ setNumRows, numRows, setNumColumns, numColumns, resetGame, gameOver, turn }) => (
    <div className={styles.sidebar}>
        <h1 className={styles.heading}> Connect Four </h1>
        <h2 className={styles.customizeHeading}> Customize Board </h2>
        <UserInput min="4" max="20" id="rowInput" value={numRows} onChange={e => setNumRows(e.target.value)} label="Number of rows" />
        <UserInput min="4" max="20" id="colInput" value={numColumns} onChange={e => setNumColumns(e.target.value)} label="Number of columns" />
        <TurnStatus turn={turn} gameOver={gameOver} resetGame={resetGame} />
    </div>
);

export default Sidebar;