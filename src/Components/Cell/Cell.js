import React, { useEffect, useRef } from 'react';
import classnames from 'classnames';
import styles from './Cell.module.css';

const Cell = ({ rowIndex, colIndex, onClick, val, onHover, isHovered, turn }) => {
    const buttonEl = useRef(null);


    useEffect(() => {
        buttonEl.current.addEventListener("mouseenter", () => onHover(colIndex));
        return buttonEl.current.removeEventListener("mousenter", () => onHover(colIndex));
    }, [])

    const buttonStyle = classnames(styles.button, {
        [styles.pink]: val === '1',
        [styles.yellow]: val === '2',
        [styles.green]: val === '3',
        [styles.hoveredPink]: isHovered && turn === '1',
        [styles.hoveredYellow]: isHovered && turn === '2',
        [styles.hoveredGreen]: isHovered && turn === '3'
    })
    return (
        <td className={styles.cell}>
            <button
                ref={buttonEl}
                className={buttonStyle}
                onClick={onClick}
                aria-label={`row ${rowIndex}, column ${colIndex}, occupied by player ${val}`}
            />
        </td>
    );
}

export default Cell;