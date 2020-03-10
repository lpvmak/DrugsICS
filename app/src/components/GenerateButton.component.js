import React from "react";

export function GenerateButton(props) {
    return (
        <button className="genButton" onClick={props.onClick}>
            Generate
        </button>
    );
}