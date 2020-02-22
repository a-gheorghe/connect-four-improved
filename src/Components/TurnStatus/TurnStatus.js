import React from 'react';
import classnames from 'classnames';
import styles from './TurnStatus.module.css';

const TurnStatus = ({ turn, gameOver, resetGame, undo }) => {
    const color = turn === '1' ? 'Pink' : 'Yellow';

    const winner = gameOver &&
    gameOver.winner === '1' ? 'Pink' :
    gameOver.winner === '2' ? 'Yellow' :
    'Green'

    const chipStyle = classnames(styles.chip, {
        [styles.pink]: gameOver.gameOver ? gameOver.winner === '1' : turn === '1',
        [styles.yellow]: gameOver.gameOver ? gameOver.winner === '2' : turn === '2',
        [styles.green]: gameOver.gameOver ? gameOver.winner === '3' : turn === '3'
    });

    const containerStyle = classnames(styles.statusContainer, {
        [styles.pinkShadow]: gameOver.gameOver && gameOver.winner === '1',
        [styles.yellowShadow]: gameOver.gameOver && gameOver.winner === '2',
        [styles.greenShadow]: gameOver.gameOver && gameOver.winner === '3'
    })

    const textStyle = classnames(styles.turn, {
        [styles.largerText]: gameOver.gameOver
    })

    return (
        <div className={containerStyle} aria-live="polite" role="alert">
            <span className={textStyle}> {gameOver.gameOver ? `${winner} wins!` : `${color}'s turn`} </span>
            <div className={chipStyle} />
            <button onClick={undo}> Undo </button>
            <button onClick={resetGame} className={styles.resetButton}> Reset game </button>
        </div>
    );
}

export default TurnStatus;