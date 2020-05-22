import React from "react";
import {Button} from 'reactstrap';

/**
 * Generate button React component
 * @param props - React properties for component
 */
export function GenerateButton(props) {
    return (
        <Button id="gen-button"
                type="submit"
                onClick={props.onClick}
        >
            {props.name}
        </Button>
    );
}