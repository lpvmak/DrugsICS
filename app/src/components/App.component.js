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
        let newDosage = values.dosage;
        if (newDosage !== formValues.drugs[index].dosage){
            values.timeList = []
            switch (newDosage) {
                case "1":
                    values.timeList.push("08:00");
                    break;
                case "2":
                    values.timeList.push("08:00");
                    values.timeList.push("20:00");
                    break;
                case "3":
                    values.timeList.push("07:00");
                    values.timeList.push("15:00");
                    values.timeList.push("23:00");
                    break;
                case "4":
                    values.timeList.push("06:00");
                    values.timeList.push("12:00");
                    values.timeList.push("18:00");
                    values.timeList.push("00:00");
                    break;
                case "5":
                    values.timeList.push("07:00");
                    values.timeList.push("12:00");
                    values.timeList.push("17:00");
                    values.timeList.push("22:00");
                    values.timeList.push("02:00");
                    break;
                case "6":
                    values.timeList.push("06:00");
                    values.timeList.push("10:00");
                    values.timeList.push("14:00");
                    values.timeList.push("18:00");
                    values.timeList.push("22:00");
                    values.timeList.push("02:00");
                    break;
                default:
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

            <pre>{JSON.stringify(formValues, null, 2)}</pre>

            <AddButton onClick = {handleAddMore}/>
            <GenerateButton onClick = {handleSubmit}/>

        </div>
    );
}