import React from "react";
import Form from "./Form.component";
import  {GenerateButton} from "./GenerateButton.component";
import {AddButton} from "./AddButton.component";

export function App() {
    const [formValues, setFormValues] = React.useState({
        forms: [{}],
        numOfForms: 1
    });
    
    function handleFormChange(index, values) {
        let forms = formValues.forms.slice();
        forms[index] = values;
        setFormValues({
            forms: forms,
            numOfForms: formValues.numOfForms
        })
    }

    function handleSubmit() {
        alert(JSON.stringify(formValues, null, 2));
    }

    function handleAddMore(){
        setFormValues(formValues => ({
            forms: [...formValues.forms, {}],
            numOfForms: (formValues.numOfForms += 1)
        }))
    }

    let forms = [];

    for (let i = 0; i < formValues.numOfForms; i++) {
        forms.push(<Form onChange={handleFormChange} key={i} index={i} />);
    }

    return (
        <div className="App">

            <h1>Multiple Form in one submition</h1>
            {forms}

            <pre>{JSON.stringify(formValues, null, 2)}</pre>

            {/*<button onClick={handleAddMore}>Add more</button>*/}
            <AddButton onClick = {handleAddMore}/>
            <GenerateButton onClick = {handleSubmit}/>

        </div>
    );
}