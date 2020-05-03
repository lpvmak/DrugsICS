import React from "react";
import Form from "./Form.component";
import {GenerateButton} from "./GenerateButton.component";
import {AddButton} from "./AddButton.component";
import {EventPlanGenerator} from "../generate_script/EventPlanGenerator";
import { Container, Row, Col } from 'reactstrap';
import { LanguageProvider } from '../containers/Language';
import { Text } from '../containers/Language';
import LanguageSelector from './LanguageSelector.component';



/**
 * Initialisation of main component of React application
 */
export function App() {
    const [appState, setAppState] = React.useState({
        drugs: [{
            id: Date.now(),
        }],
        numOfForms: 1,
        timeSet: new Map()
    });


    /**
     * Handler for the form onChange
     */
    function handleFormChange(index, values) {
        let drugs = appState.drugs.slice();

        /* Get id in array: */
        let arrIndex = 0;
        for (arrIndex; arrIndex < appState.numOfForms; arrIndex++){
            if (appState.drugs[arrIndex].id === index){
                break;
            }
        }

        let startDate = new Date(values.dateFrom);
        let endDate = new Date(values.dateTo);
        if (startDate > endDate){
            values.dateTo = values.dateFrom;
        }

        /* Prediction time set: */
        let newDosage = values.dosage;

        if (newDosage !== drugs[arrIndex].dosage){
            if (appState.timeSet.has(newDosage)){
                values.timeList = appState.timeSet.get(newDosage);
            }else{
                values.timeList = [];
                let startHour = 0;
                let interval = Math.ceil(24 / newDosage);
                for (let i = 0; i < newDosage; i++, startHour+=interval) {
                    let curHour = startHour % 24;
                    values.timeList.push((curHour < 10 ? "0" + curHour : curHour) + ":" + "00");
                }
            }
        }

        /* Save time set */
        appState.timeSet.set(values.dosage, values.timeList);

        /* Change values in state: */
        drugs[arrIndex] = {
            ...values,
            id: drugs[arrIndex].id,
        };
        setAppState({
            drugs: drugs,
            numOfForms: appState.numOfForms,
            timeSet: appState.timeSet
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
        let formButtons = document.getElementsByClassName('med-form__submit');
        for (let button of formButtons){
            button.click();
        }
        let readyToGenerate = false;
        for (let form of appState.drugs){
            readyToGenerate = validForm(form);
            if (!readyToGenerate){
                return;
            }
        }
        EventPlanGenerator.createNewPlan(appState);
        let FileSaver = require('file-saver');
        const file = new File([EventPlanGenerator.eventList], "MedSched.ics", {type: "Application/octet-stream;charset=utf-8"});
        FileSaver.saveAs(file);
        //EventPlanGenerator.savePlanToFile('newPlan.ics');
    }

    /**
     * Handler for the addition button
     */
    function handleAddMore(){
        setAppState(appState => ({
            drugs: [...appState.drugs, {id: Date.now()}],
            numOfForms: (appState.numOfForms += 1),
            timeSet: appState.timeSet
        }))
    }

    /**
     * Handler for the delete button
     */
    function handleDeleteForm(index){
        let form = appState.drugs;

        /* Get id in array: */
        let arrIndex = 0;
        for (arrIndex; arrIndex < appState.numOfForms; arrIndex++){
            if (appState.drugs[arrIndex].id === index){
                break;
            }
        }
        /* Delete form in state: */
        form.splice(arrIndex, 1);
        setAppState(appState => ({
            drugs: form,
            numOfForms: (appState.numOfForms -= 1),
            timeSet: appState.timeSet
        }));
    }

    /* Render current number of forms: */
    let forms = [];
    for (let i = 0; i < appState.numOfForms; i++) {
        forms.push(
            <Form onChange={handleFormChange}
                  onClickDelete={handleDeleteForm}
                  keyValue={appState.drugs[i].id}
                  key={appState.drugs[i].id}
                  numOfForms={appState.numOfForms}
                  values = {appState.drugs[i]}
            />
        );
    }


    return (
        <LanguageProvider>

            <div className="header">

                <h1 id="header__text"><Text tid="siteName" /></h1>
                <LanguageSelector />
            </div>

            <Container >
                <Row>
                    <Col md={12}>
                        <h1> <Text tid="slogan" /></h1>
                    </Col>
                </Row>

                {forms}

                {/*<pre>{JSON.stringify(appState, null, 2)}</pre>*/}
                <Row>
                    <Col>
                        <AddButton onClick = {handleAddMore}
                                   name = <Text tid="addMore" />
                        />
                    </Col>
                    <Col>
                        <GenerateButton onClick = {handleSubmit}
                                        name = <Text tid="download" />
                        />
                    </Col>
                </Row>

            </Container>
        </LanguageProvider>
    );
}