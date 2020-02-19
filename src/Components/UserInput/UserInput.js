import React from 'react';
import styles from './UserInput.module.css';


const UserInput = ({ label, ...props }) => {
    return (
        <React.Fragment>
            <label htmlFor="rowInput" className={styles.label}> {label} </label>
            <input {...props} type="number" className={styles.input} />
        </React.Fragment>
    );
};

export default UserInput;