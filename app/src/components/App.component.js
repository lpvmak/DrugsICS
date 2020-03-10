import React from "react";
import Form from "./Form.component";
import  {GenerateButton} from "./GenerateButton.component";
import {AddButton} from "./AddButton.component";

export function App() {
    const [formValues, setFormValues] = React.useState({
        drugs: [{}],
        numOfForms: 1
    });
    
    function handleFormChange(index, values) {
        let drugs = formValues.drugs.slice();
        if (values.dosage !== "" && values.dosage !== formValues.drugs[index].dosage){
            values.timeList = []
            for (let i = 0; i < values.dosage; ++i){
                values.timeList.push("");
            }
        }
        drugs[index] = values;
        setFormValues({
            drugs: drugs,
            numOfForms: formValues.numOfForms
        })
    }

    function handleSubmit() {
        alert(JSON.stringify(formValues, null, 2));
    }

    function handleAddMore(){
        setFormValues(formValues => ({
            drugs: [...formValues.drugs, {}],
            numOfForms: (formValues.numOfForms += 1)
        }))
    }

    let forms = [];

    for (let i = 0; i < formValues.numOfForms; i++) {
        forms.push(<Form onChange={handleFormChange} key={i} index={i} />);
    }

    return (
        <div className="App">

            <h1>Create your own plan of taking pills</h1>
            {forms}

            {/*<pre>{JSON.stringify(formValues, null, 2)}</pre>*/}

            <AddButton onClick = {handleAddMore}/>
            <GenerateButton onClick = {handleSubmit}/>

        </div>
    );
}