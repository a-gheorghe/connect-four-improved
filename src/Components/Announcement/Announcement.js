import React from 'react';
import classnames from 'classnames';
import styles from './Announcement.module.css';

const Announcement = ({ gameOver, resetGame }) => {
    const playerTextColour = classnames({
        [styles.pink]: gameOver.winner === '1',
        [styles.yellow]: gameOver.winner === '2'
    });
    return (
        <div aria-live="assertive">
            {gameOver.gameOver &&
            <div className={styles.message}>
                <div className={styles.textContainer}>
                    <span className={playerTextColour}>Game over! </span>
                    <div className={playerTextColour}> Player {gameOver.winner} wins {gameOver.direction} </div>
                </div>
            </div>}
            <button onClick={resetGame} className={styles.resetButton}> Reset game </button>
        </div>
        )
    }

export default Announcement;