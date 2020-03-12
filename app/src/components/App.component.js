import React from "react";
import Form from "./Form.component";
import {GenerateButton} from "./GenerateButton.component";
import {AddButton} from "./AddButton.component";


const { EventPlanGenerator } = require('..//generate_script/EventPlanGenerator');

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
                    values.timeList = ["08:00"];
                    break;
                case "2":
                    values.timeList = ["08:00", "20:00"];
                    break;
                case "3":
                    values.timeList = ["07:00", "15:00", "23:00"];
                    break;
                case "4":
                    values.timeList = ["06:00", "12:00", "18:00", "00:00"];
                    break;
                case "5":
                    values.timeList = ["07:00", "12:00", "17:00", "22:00", "02:00"];
                    break;
                case "6":
                    values.timeList = ["06:00", "10:00", "14:00", "18:00", "22:00", "02:00"];
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
        EventPlanGenerator.createNewPlan(formValues);
        let FileSaver = require('file-saver');
        const file = new File([EventPlanGenerator.eventList], "MedSched.ics", {type: "Application/octet-stream;charset=utf-8"});
        FileSaver.saveAs(file);
        //EventPlanGenerator.savePlanToFile('newPlan.ics');
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