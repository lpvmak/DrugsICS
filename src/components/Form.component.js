import {withFormik} from "formik";
import ReactDOM from 'react-dom';
import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {Form as FormStrap, Col, Row, FormGroup, Label, Input, FormText, Alert} from 'reactstrap';
import ModalWindow from "./ModalWindow.component";



export function Form(props) {
    const { values, handleChange, onChange, touched, errors, handleSubmit, onClickDelete, numOfForms, keyValue, lang} = props;

    let nameRef = useRef();
    React.useEffect(() => {
        if (onChange) {
            onChange(keyValue, values);
        }
    }, [values]);

    /* Initialize touching values: */
    for (let i = 0; !!touched.timeList && i < values.timeList.length; i++){
        touched.timeList[i] = true;
    }

    /* Time-input tags: */
    const curTimeList = [];
    for (let i = 0; i < values.dosage; i++) {
        curTimeList.push("timeList[" + i + "]");
    }

    /* Create layout of time list tag: */
    const timeListTag = curTimeList.map((item, index) => {
        return (
            <Col key={index} md={4}>
                <FormGroup>
                    <Input name={item}
                           type="time"
                           value={values.timeList[index]}
                           onChange={handleChange} />
                    {!!touched.timeList && !!errors.timeList && touched.timeList[index] && (values.timeList[index] === "") ?
                        (
                            <FormText color="red">
                                {errors.timeList[index]}
                            </FormText>
                        ) : null}
                </FormGroup>
            </Col>
        )
    });
    let layoutTimeListTag = null;
    if (values.dosage <= 3){
        layoutTimeListTag = <Row form>{timeListTag.slice(0,3)}</Row>;
    }
    else{
        layoutTimeListTag = (
            <div>
                <Row form>{timeListTag.slice(0,3)}</Row>
                <Row form>{timeListTag.slice(3,6)}</Row>
            </div>
        );
    }

    /* Enable/disable select reminder time: */
    let statusSelect = {};
    if (!values.notifications){
        statusSelect["disabled"] = "disabled";
    }else{
        statusSelect = {}
    }

    /* Enable/disable delete form button: */
    let statusDelete = {};
    let deleteButtons;
    if (numOfForms !== 1){
        deleteButtons = (
            <label className = "delete-button__place"
                   htmlFor = {"delete-button"+ (keyValue + 1)}>
            </label>
        );
        statusDelete = {};
    }else {
        deleteButtons = null;
        statusDelete["disabled"] = "disabled";
    }

    return (
        <Row ref = {nameRef}>
            <Col>
                <FormStrap id={"form"+(keyValue + 1)}
                           className="med-form"
                           onSubmit={handleSubmit}>
                    <Row id = "med-form__head">
                        <Col id="med-form__head__name" md={11}>
                            {values.drugName}
                        </Col>
                        <Col id="med-form__head__delete-button" md={1}>
                            <ModalWindow idButton = {"delete-button"+ (keyValue + 1)}
                                         className="delete-button"
                                         onClick={() => onClickDelete(keyValue)}
                                         buttonLabel="delete"
                                         lang = {lang}
                                         />
                            {deleteButtons}
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label> {lang.medName}</Label>
                                <Input name="drugName"
                                       value={values.drugName}
                                       onChange={handleChange} />
                                {touched.drugName && errors.drugName ?
                                    (
                                        <FormText color="red">
                                            {errors.drugName}
                                        </FormText>
                                    ) : null}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={4}>
                            <FormGroup>
                                <Label>{lang.startDate} </Label>
                                <Input name="dateFrom"
                                       type="date"
                                       onChange={handleChange}
                                       value={values.dateFrom}
                                />
                                {touched.dateFrom && errors.dateFrom ?
                                    (
                                        <FormText color="red">
                                            {errors.dateFrom}
                                        </FormText>
                                    ) : null}
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label>{lang.endDate} </Label>
                                <Input name="dateTo"
                                       type="date"
                                       onChange={handleChange}
                                       value={values.dateTo}
                                />
                                {touched.dateTo && errors.dateTo ?
                                    (
                                        <FormText color="red">
                                            {errors.dateTo}
                                        </FormText>
                                    ) : null}
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label>{lang.freq} </Label>
                                <Input type="select"
                                       name="dosage"
                                       onChange={handleChange}
                                       value={values.dosage}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            {touched.dateTo && touched.dateFrom && !errors.dateFrom && !errors.dateTo && errors.endDate ?
                                (
                                    <FormText id="med-form__err-message--long" color="red">
                                        {errors.endDate}
                                    </FormText>
                                ) : null}
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <Label>{lang.timesTaken}</Label>
                        </Col>
                    </Row>
                    {layoutTimeListTag}
                    <Row form>
                        <Col md={4}>
                            <FormGroup check>
                                <Input name = "notifications"
                                       type="checkbox"
                                       id = {"notification-checkbox" + (keyValue + 1)}
                                       onChange={handleChange}
                                       value={values.notification}
                                />
                                <label className = "med-form__notification-checkbox"
                                       htmlFor = {"notification-checkbox" + (keyValue + 1)}
                                >
                                </label>
                                <Label >{lang.remind}</Label>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <Input type="select"
                                   name="remindTime"
                                   onChange={handleChange}
                                   value={values.remindTime}
                                   {...statusSelect}>
                                <option value={0}>{lang.onTime}</option>
                                <option value={5}>{lang.minBefore5}</option>
                                <option value={10}>{lang.minBefore10}</option>
                                <option value={15}>{lang.minBefore15}</option>
                                <option value={30}>{lang.minBefore30}</option>
                                <option value={60}>{lang.minBefore60}</option>
                            </Input>
                        </Col>
                        <Col md={4}>
                            <button className="med-form__submit" type="submit"></button>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label>{lang.comment}:</Label>
                                <Input type="textarea"
                                       name="description"
                                       onChange={handleChange}
                                       rows={2} cols={48}>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </FormStrap>
            </Col>
        </Row>
    );
}

/**
 * Formik form state initialization
 */
export default withFormik({
    mapPropsToValues: () => {
        /* Setting initial date: */
        let startDate = new Date().toISOString().substring(0,10);
        let endDate = new Date();
        endDate.setDate(endDate.getDate() + 5);
        endDate = endDate.toISOString().substring(0,10);

        return {
            drugName: "",
            dateFrom: startDate,
            dateTo: endDate,
            dosage: "3",
            timeList: [""],
            notifications: false,
            remindTime: "0",
            description: ""

        };
    },
    validate: (values, prop) => {
        const errors = {};
        errors.timeList = ["", "", "", "", "", ""];
        let req = prop.lang.required;
        if (!values.drugName) {
            errors.drugName = req;
        }
        if (!values.dateFrom) {
            errors.dateFrom = req;
        }
        if (!values.dateTo) {
            errors.dateTo = req;
        }
        if (values.dateTo < values.dateFrom) {
            errors.endDate = 'Start date should not precede end date';
        }
        for (let i = 0; i < values.timeList.length; i++){
            if (!values.timeList[i]){
                errors.timeList[i] = req;
            }
        }
        return errors;
    },
    handleSubmit: () => {},
})(Form);

Form.propTypes = {
    children: PropTypes.node,
    inline: PropTypes.bool,
    // Pass in a Component to override default element
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]), // default: 'form'
    innerRef: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
    className: PropTypes.string,
    cssModule: PropTypes.object,
};

FormGroup.propTypes = {
    children: PropTypes.node,
    // Applied the row class when true, does nothing when false
    row: PropTypes.bool,
    // Applied the form-check class when true, form-group when false
    check: PropTypes.bool,
    inline: PropTypes.bool,
    // Applied the disabled class when the check and disabled props are true, does nothing when false
    disabled: PropTypes.bool,
    // Pass in a Component to override default element
    tag: PropTypes.string, // default: 'div'
    className: PropTypes.string,
    cssModule: PropTypes.object,
};