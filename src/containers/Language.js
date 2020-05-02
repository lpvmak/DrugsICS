import React, { useState, createContext, useContext } from 'react';

import { languageOptions, dictionaryList } from '../language/lang';

// create the language context with default selected language
export const LanguageContext = createContext({
    language: languageOptions[0],
    dictionary: dictionaryList[languageOptions[0].id]
});

// it provides the language context to app
export function LanguageProvider(props) {
    const languageContext = useContext(LanguageContext);
    const [language, setLanguage] = useState(languageContext.language);
    const [dictionary, setDictionary] = useState(languageContext.dictionary);

    const provider = {
        language,
        dictionary,
        setLanguage: (selectedLanguage) => {
            setLanguage(selectedLanguage);
            setDictionary(dictionaryList[selectedLanguage.id]);
        }
    };

    return (
        <LanguageContext.Provider value={provider}>
            {props.children}
        </LanguageContext.Provider>
    );
};

// get text according to id & current language
export function Text(props) {
    const languageContext = useContext(LanguageContext);

    return languageContext.dictionary[props.tid];
};


export function Option(props) {
    const languageContext = useContext(LanguageContext);

    return <option value={props.value}> {languageContext.dictionary[props.tid]} </option>

};