import React from "react";
import { Button } from 'reactstrap';

/**
 * Add button React component
 * @param props - React properties for component
 */
export function GenerateButton(props) {
    return (
        <Button id="genButton"
                type="submit"
                onClick={props.onClick}
        >
            Generate
        </Button>
    );
}