import React from "react";
/**
 * Add button React component
 * @param props - React properties for component
 */
export function AddButton(props) {
    return (
        <button className="addButton" onClick={props.onClick}>
            Add more
        </button>
    );
}