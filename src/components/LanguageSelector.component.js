import React, { useContext, useState }from 'react';
import { languageOptions } from '../language/lang';

import { LanguageContext } from '../containers/Language';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem} from "reactstrap";

export default function LanguageSelector(props) {
    const languageContext = useContext(LanguageContext);

    const handleLanguageChange = (event) => {
        const selectedLanguage = languageOptions.find(item => item.id === event.target.id);
        // set selected language by calling context method
        languageContext.setLanguage(selectedLanguage);
        props.onChange(selectedLanguage.id)
    };

    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);


    return (
        <div id={props.id}>
        <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}

                        value={languageContext.language.id}
                        onChange={handleLanguageChange}
                        direction="left"
        >
            <DropdownToggle caret >
                    <img id = "header__cur-lang-flag" src={languageContext.language.img} width="32px"/>
            </DropdownToggle>

            <DropdownMenu>
            {languageOptions.map(item => (
                <DropdownItem  key={item.id}
                               value={item.id}
                               id={item.id}
                               onClick={handleLanguageChange}
                               >
                    <div class="flex-container"
                         key={item.id}
                         value={item.id}
                         id={item.id}
                    >
                        <img id={item.id} src={item.img} width="32px" />
                        {item.text}
                    </div>


                </DropdownItem>
                    ))}
            </DropdownMenu>

        </ButtonDropdown>
        </div>
    );
};
