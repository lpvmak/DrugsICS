import React from "react";
import { Button } from 'reactstrap';

/**
 * Add button React component
 * @param props - React properties for component
 */
export function AddButton(props) {
    return (
        <Button className="addButton"
                onClick={props.onClick}>
            Add more
        </Button>
    );
}