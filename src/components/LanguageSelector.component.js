import React, { useContext, useState }from 'react';
import { languageOptions } from '../language/lang';

import { LanguageContext } from '../containers/Language';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";

export default function LanguageSelector(props) {
    const languageContext = useContext(LanguageContext);

    const handleLanguageChange = (event) => {
        const selectedLanguage = languageOptions.find(item => item.id === event.target.value);
        // set selected language by calling context method
        languageContext.setLanguage(selectedLanguage);
    };

    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);


    return (

        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}
                        id={props.id}
                        value={languageContext.language.id}
                        onChange={handleLanguageChange}
                        direction="left"
        >
            <DropdownToggle caret>
                {/*{languageContext.language.id}*/}
                <img src={languageContext.language.img} alt="hjg"/>
            </DropdownToggle>

            <DropdownMenu>
            {languageOptions.map(item => (
                <DropdownItem  key={item.id}
                               value={item.id}
                               onClick={handleLanguageChange}>
                    <img src={item.img} alt="hjg"/>
                    {item.text}
                </DropdownItem>
                    ))}
            </DropdownMenu>

        </ButtonDropdown>

    );
};
