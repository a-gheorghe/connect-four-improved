import React from 'react';
import styles from './TurnStatus.module.css';

const TurnStatus = ({turn, gameOver}) => {
    return (
        <div>
            {!gameOver.gameOver && (
            <span className={styles.turn}> It is player {turn}'s turn</span>
            )}
        </div>
    );
}

export default TurnStatus;