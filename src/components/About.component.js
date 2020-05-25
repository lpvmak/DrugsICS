import React from 'react';
import {Button, PopoverBody, UncontrolledPopover} from 'reactstrap';

const About = (props) => {
    const {
        text
    } = props;
    return (
        <div>
            <Button id="PopoverLegacy" type="button">
                <img id="header__cur-lang-flag" src="question.svg" width="30px" height="30px"/>
            </Button>
            <UncontrolledPopover trigger="legacy" placement="bottom" target="PopoverLegacy">
                <PopoverBody>
                    {props.text}
                </PopoverBody>
            </UncontrolledPopover>
        </div>
    );
}

export default About;