import React from "react";

export function AddButton(props) {
    return (
        <button className="addButton" onClick={props.onClick}>
            Add more
        </button>
    );
}