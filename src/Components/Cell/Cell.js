import React from 'react';
import classnames from 'classnames';
import styles from './Cell.module.css';

const Cell = ({ rowIndex, colIndex, onClick, val }) => {
    const buttonStyle = classnames(styles.button, {
        [styles.red]: val === '1',
        [styles.yellow]: val === '2'
    })
    return (
        <td className={styles.cell}>
            <button className={buttonStyle} onClick={onClick} />
        </td>
    );
}

export default Cell;