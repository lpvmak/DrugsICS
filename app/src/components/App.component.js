import React from "react";
import Form from "./Form.component";
import {GenerateButton} from "./GenerateButton.component";
import {AddButton} from "./AddButton.component";
import {EventPlanGenerator} from "../generate_script/EventPlanGenerator";
import { Container, Row, Col } from 'reactstrap';

/**
 * Initialisation of main component of React application
 */



export function App() {
    const [formValues, setFormValues] = React.useState({
        drugs: [{}],
        numOfForms: 1
    });

    document.title = "MedSched online";


    /**
     * Handler for the form onChange
     */
    function handleFormChange(index, values) {
        let drugs = formValues.drugs.slice();

        /* Prediction time set: */
        let newDosage = values.dosage;
        if (newDosage !== formValues.drugs[index].dosage){
            values.timeList = [];
            let startHour = 8;
            let interval = Math.ceil(24 / newDosage);
            for (let i = 0; i < newDosage; i++, startHour+=interval) {
                let curHour = startHour % 24;
                values.timeList.push((curHour < 10 ? "0" + curHour : curHour) + ":" + "00");
            }
        }
        drugs[index] = values;
        setFormValues({
            drugs: drugs,
            numOfForms: formValues.numOfForms
        })
    }

    /**
     * Handler for the submit button
     */
    function handleSubmit() {
        let formButtons = document.getElementsByClassName('formSubmit');
        for (let button of formButtons){
            button.click();
        }
        EventPlanGenerator.createNewPlan(formValues);
        let FileSaver = require('file-saver');
        const file = new File([EventPlanGenerator.eventList], "MedSched.ics", {type: "Application/octet-stream;charset=utf-8"});
        FileSaver.saveAs(file);
        //EventPlanGenerator.savePlanToFile('newPlan.ics');
    }

    /**
     * Handler for the addition button
     */
    function handleAddMore(){
        setFormValues(formValues => ({
            drugs: [...formValues.drugs, {}],
            numOfForms: (formValues.numOfForms += 1)
        }))
    }

    /* Render current number of forms: */
    let forms = [];
    for (let i = 0; i < formValues.numOfForms; i++) {
        forms.push(<Row key={i}><Col><Form onChange={handleFormChange} index={i} /></Col></Row>);
    }

    return (
        <div>

            <div id="header">
                <h1 id="headerH1">MedSched</h1>
            </div>

            <Container >
                <Row>
                    <Col md={12}>
                        <h1>Create your  own plan of taking pills</h1>
                    </Col>
                </Row>

                {forms}

                {/*<pre>{JSON.stringify(formValues, null, 2)}</pre>*/}
                <Row>
                    <Col>
                        <AddButton onClick = {handleAddMore}/>
                    </Col>
                    <Col>
                        <GenerateButton onClick = {handleSubmit}/>
                    </Col>
                </Row>

            </Container>
        </div>
    );
}