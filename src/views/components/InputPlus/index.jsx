import React from 'react';
import { useCallback } from 'react';
import { useState } from 'react';

import styles from './index.module.scss';

export const InputPlus = ({ onAdd }) => {

    const [inputValue, setInputValue] = useState("");

    const onAddMemo = useCallback(() => {
        onAdd(inputValue);
        setInputValue("");
    }, [inputValue]);

    return (
        <div className={styles.inputPlus}>
            <input
                type="text"
                className={styles.inputPlusValue}
                placeholder="Type here..."
                value={inputValue}
                onChange={(event) => {
                    setInputValue(event.target.value);
                }}
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        onAddMemo();
                    }
                }}
            />
            <button
                onClick={onAddMemo}
                aria-label="Add"
                className={styles.inputPlusButton}
            />
        </div>
    );
}
