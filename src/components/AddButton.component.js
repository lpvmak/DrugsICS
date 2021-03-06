import React from "react";
import {Button} from 'reactstrap';

/**
 * Add button React component
 * @param props - React properties for component
 */


export function AddButton(props) {
    return (
        <Button id="add-button"
                onClick={props.onClick}>
            {props.name}
        </Button>
    );
}