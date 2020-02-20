import React from 'react';
import styles from './UserInput.module.css';


const UserInput = ({ label, id, ...props }) => {
    return (
        <React.Fragment>
            <label htmlFor={`${id}-input`} className={styles.label}> {label} </label>
            <div className={styles.inputContainer}>
                <input {...props} id={`${id}-input`} type="number" className={styles.input} />
            </div>
        </React.Fragment>
    );
};

export default UserInput;