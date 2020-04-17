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
        drugs: [{
            id: Date.now(),
        }],
        numOfForms: 1
    });


    /**
     * Handler for the form onChange
     */
    function handleFormChange(index, values) {
        let drugs = formValues.drugs.slice();

        /* Get id in array: */
        let arrIndex = 0;
        for (arrIndex; arrIndex < formValues.numOfForms; arrIndex++){
            if (formValues.drugs[arrIndex].id === index){
                break;
            }
        }

        /* Prediction time set: */
        let newDosage = values.dosage;
        if (newDosage !== formValues.drugs[arrIndex].dosage){
            values.timeList = [];
            let startHour = 8;
            let interval = Math.ceil(24 / newDosage);
            for (let i = 0; i < newDosage; i++, startHour+=interval) {
                let curHour = startHour % 24;
                values.timeList.push((curHour < 10 ? "0" + curHour : curHour) + ":" + "00");
            }
        }

        /* Change values in state: */
        drugs[arrIndex] = {
            ...values,
            id: formValues.drugs[arrIndex].id,
        };
        setFormValues({
            drugs: drugs,
            numOfForms: formValues.numOfForms
        });
    }

    /**
     * Function for form validation
     */
    function validForm(form) {
        if (!form.drugName || !form.dateFrom || !form.dateTo || form.dateTo < form.dateFrom) {
            return false;
        }else {
            for (let ind = 0; ind < form.timeList.length; ind++){
                if (form.timeList[ind] === ""){
                    return false;
                }
            }
            return true;
        }
    }

    /**
     * Handler for the submit button
     */
    function handleSubmit() {
        /* Click all submit buttons for validaton: */
        let formButtons = document.getElementsByClassName('formSubmit');
        for (let button of formButtons){
            button.click();
        }
        let readyToGenerate = false;
        for (let form of formValues.drugs){
            readyToGenerate = validForm(form);
            if (!readyToGenerate){
                return;
            }
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
            drugs: [...formValues.drugs, {id: Date.now()}],
            numOfForms: (formValues.numOfForms += 1)
        }))
    }

    /**
     * Handler for the delete button
     */
    function handleDeleteForm(index){
        let form = formValues.drugs;

        /* Get id in array: */
        let arrIndex = 0;
        for (arrIndex; arrIndex < formValues.numOfForms; arrIndex++){
            if (formValues.drugs[arrIndex].id === index){
                break;
            }
        }
        /* Delete form in state: */
        form.splice(arrIndex, 1);
        setFormValues(formValues => ({
            drugs: form,
            numOfForms: (formValues.numOfForms -= 1)
        }));
    }

    /* Render current number of forms: */
    let forms = [];
    for (let i = 0; i < formValues.numOfForms; i++) {
        forms.push(
            <Form onChange={handleFormChange}
                  onClickDelete={handleDeleteForm}
                  keyValue={formValues.drugs[i].id}
                  key={formValues.drugs[i].id}
                  numOfForms={formValues.numOfForms}
                  values = {formValues.drugs[i]}
            />
        );
    }

    return (
        <div>

            <div id="header">
                <h1 id="headerH1">MedSched</h1>
            </div>

            <Container >
                <Row>
                    <Col md={12}>
                        <h1>Create your own medication regimen</h1>
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