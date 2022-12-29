import React from 'react';
import { useLayoutEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';

import styles from './index.module.scss';

export const InputTask = ({ title, id, onDone, onRemove, onEdite }) => {

    const [checked, setCheked] = useState(false);
    const [isEditModeButton, setEditModeButton] = useState(false);
    const [value, setValue] = useState(title);
    const editTitleInputRef = useRef(null);

    useLayoutEffect(() => {
        if (isEditModeButton && editTitleInputRef) {
            editTitleInputRef.current.focus();
        }
    }, [isEditModeButton])

    const onChecked = (event) => {
        setCheked(event.target.checked);
        setTimeout(() => {
            onDone(id)
        }, 400)
    }

    return (
        <div className={styles.inputTask}>
            <label className={styles.inputTaskLabel}>
                <input
                    checked={checked}
                    type="checkbox"
                    className={styles.inputTaskCheckbox}
                    onChange={onChecked}
                />
                {isEditModeButton ? (
                    <input
                        value={value}
                        ref={editTitleInputRef}
                        className={styles.inputTaskTitleEdit}
                        onChange={(event) => {
                            setValue(event.target.value);
                        }}
                    />
                ) : (
                    <h3 className={styles.inputTaskTitle}>{title}</h3>
                )}
            </label>
            {isEditModeButton ? (
                <button
                    onClick={() => {
                        setEditModeButton(false);
                        onEdite(id, value);
                    }}
                    aria-label="Save"
                    className={styles.inputTaskEdit}
                />
            ) : (
                <button
                    onClick={() => {
                        setEditModeButton(!isEditModeButton)
                    }}
                    aria-label="Edit"
                    className={styles.inputTaskEdit}
                />
            )}
            <button
                onClick={() => {
                    onRemove(id);
                }}
                aria-label="Remove"
                className={styles.inputTaskRemove}
            />
        </div>
    );
}

/* For Edit mode
<input
    className={styles.inputTaskTitleEdit}
/>

<button
    aria-label="Save"
    className={styles.inputTaskSave}
/>
*/