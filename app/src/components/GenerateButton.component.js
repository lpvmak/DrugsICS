import React from "react";

/**
 * Add button React component
 * @param props - React properties for component
 */
export function GenerateButton(props) {
    return (
        <button className="genButton" onClick={props.onClick}>
            Generate
        </button>
    );
}