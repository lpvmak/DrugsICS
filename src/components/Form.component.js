import {withFormik} from "formik";
import React, {useRef} from "react";
import PropTypes from 'prop-types';
import {Col, CustomInput, Form as FormStrap, FormGroup, FormText, Input, Label, Row} from 'reactstrap';
import ModalWindow from "./ModalWindow.component";
import {Option, Text} from "../containers/Language";

export function Form(props) {
    const {values, handleChange, onChange, touched, errors, handleSubmit, onClickDelete, numOfForms, keyValue, validateForm} = props;

    let nameRef = useRef();
    React.useEffect(() => {
        if (onChange) {
            onChange(keyValue, values);
        }
    }, [values]);

    function handleEndDateInput() {
        if (values.dateFrom > values.dateTo) {
            document.getElementById('end-date-input' + (keyValue + 1)).min = values.dateTo;
        }
    }

    function handleDateStartInput() {
        let startDate = new Date(values.dateFrom);
        let endDate = new Date(values.dateTo);
        if (startDate > endDate) {
            values.dateTo = values.dateFrom;
        }
        onChange(keyValue, values);
        errors.date = '';
    }


    function handleFreqInput() {
        if (values.dosage < 1) {
            values.dosage = 1;
        } else if (values.dosage > 12) {
            values.dosage = 12;
        }
        onChange(keyValue, values);
    }

    /* Initialize touching values: */
    for (let i = 0; !!touched.timeList && i < values.timeList.length; i++) {
        touched.timeList[i] = true;
    }

    let countTimeInputTags = values.dosage;

    if (countTimeInputTags > 12) {
        countTimeInputTags = 12;
    } else if (countTimeInputTags < 1) {
        countTimeInputTags = 1;
    }

    /* Time-input tags: */
    const curTimeList = [];
    for (let i = 0; i < countTimeInputTags; i++) {
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
                           onChange={handleChange}/>
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

    let layoutTimeListTag = [];
    for (let i = 0; i < countTimeInputTags; i += 3) {
        layoutTimeListTag.push(<Row form>{timeListTag.slice(i, i + 3)}</Row>)
    }

    /* Enable/disable select reminder time: */
    let statusSelect = {};
    if (!values.notifications) {
        statusSelect["disabled"] = "disabled";
    } else {
        statusSelect = {}
    }

    /* Enable/disable delete form button: */
    let statusDelete = {};
    let deleteButtons;
    if (numOfForms !== 1) {
        deleteButtons = (
            <label className="delete-button__place"
                   htmlFor={"delete-button" + (keyValue + 1)}>
            </label>
        );

    } else {
        deleteButtons = null;
        statusDelete["disabled"] = "disabled";
    }
    let deleteOption = {};
    /*Choose type of delete button*/
    if (values.drugName === '') {
        deleteOption = (
            <button id={"delete-button" + (keyValue + 1)}
                    className="delete-button"
                    onClick={() => onClickDelete(keyValue)}
                    type="button"
            >
            </button>
        );
    } else {
        deleteOption = (
            <ModalWindow idButton={"delete-button" + (keyValue + 1)}
                         className="delete-button"
                         onClick={() => onClickDelete(keyValue)}
                         buttonLabel="delete"
                         name={values.drugName}
            />
        );
    }

    return (
        <Row ref={nameRef}>
            <Col>
                <FormStrap id={"form" + (keyValue + 1)}
                           className="med-form"
                           onSubmit={handleSubmit}>
                    <Row id="med-form__head">
                        <Col id="med-form__head__name" md={11}>
                            {values.drugName}
                        </Col>
                        <Col id="med-form__head__delete-button" md={1}>
                            {deleteOption}
                            {deleteButtons}
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label> <Text tid="medName"/></Label>
                                <Input name="drugName"
                                       value={values.drugName}
                                       onChange={handleChange}/>
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
                                <Label><Text tid="startDate"/></Label>
                                <Input name="dateFrom"
                                       type="date"
                                       onChange={handleChange}
                                       onBlur={handleDateStartInput}
                                       value={values.dateFrom}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label><Text tid="endDate"/></Label>
                                <Input name="dateTo"
                                       type="date"
                                       id={'end-date-input' + (keyValue + 1)}
                                       onChange={handleChange}
                                       onBlur={handleEndDateInput}
                                       value={values.dateTo}
                                       min={values.dateFrom}
                                />
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <FormGroup>
                                <Label><Text tid="freq"/> </Label>
                                <Input name="dosage"
                                       type="number"
                                       value={values.dosage}
                                       onChange={handleChange}
                                       onBlur={handleFreqInput}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            {(touched.dateFrom || touched.dateTo) && errors.date ?
                                (
                                    <FormText id="med-form__err-message--long" color="red">
                                        {errors.date}
                                    </FormText>
                                ) : null}
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <CustomInput type="range"
                                         className="med-form__slider"
                                         name="dosage"
                                         onChange={handleChange}
                                         value={values.dosage}
                                         min={1}
                                         max={12}
                            />
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <Label><Text tid="timesTaken"/></Label>
                        </Col>
                    </Row>
                    {layoutTimeListTag}
                    <Row form>
                        <Col md={4}>
                            <FormGroup check>
                                <Input name="notifications"
                                       type="checkbox"
                                       id={"notification-checkbox" + (keyValue + 1)}
                                       onChange={handleChange}
                                       value={values.notification}
                                />
                                <label className="med-form__notification-checkbox"
                                       htmlFor={"notification-checkbox" + (keyValue + 1)}
                                >
                                </label>
                                <Label><Text tid="remind"/></Label>
                            </FormGroup>
                        </Col>
                        <Col md={4}>
                            <Input type="select"
                                   name="remindTime"
                                   onChange={handleChange}
                                   value={values.remindTime}
                                   {...statusSelect}>
                                {}
                                <Option value={0} tid="onTime"/>
                                <Option value={5} tid="minBefore5"/>
                                <Option value={10} tid="minBefore10"/>
                                <Option value={15} tid="minBefore15"/>
                                <Option value={30} tid="minBefore30"/>
                                <Option value={60} tid="minBefore60"/>
                            </Input>
                        </Col>
                        <Col md={4}>
                            <button className="med-form__submit" type="submit"/>
                        </Col>
                    </Row>
                    <Row form>
                        <Col md={12}>
                            <FormGroup>
                                <Label><Text tid="comment"/>:</Label>
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
        let startDate = new Date().toISOString().substring(0, 10);
        let endDate = new Date();
        endDate.setDate(endDate.getDate() + 5);
        endDate = endDate.toISOString().substring(0, 10);

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
        errors.timeList = ["", "", "", "", "", "", "", "", "", "", "", ""];
        let req = <Text tid="required"/>;

        if (values.dateFrom > values.dateTo) {
            errors.date = <Text tid="dateError"/>;
        }
        if (!values.drugName) {
            errors.drugName = req;
        }
        for (let i = 0; i < values.timeList.length; i++) {
            if (!values.timeList[i]) {
                errors.timeList[i] = req;
            }
        }
        return errors;
    },
    handleSubmit: () => {
    },
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