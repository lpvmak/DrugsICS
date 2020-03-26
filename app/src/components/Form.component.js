import {withFormik} from "formik";
import React from "react";
import PropTypes from 'prop-types';
import {Form, Col, Row, FormGroup, Label, Input, FormText} from 'reactstrap';



export function FormikForms(props) {

    const { values, handleChange, onChange, touched, errors, handleSubmit} = props;
    React.useEffect(() => {
        if (onChange) {
            onChange(props.index, values);
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
                    <Input name={item} type="time" value={values.timeList[index]} onChange={handleChange} />
                    {!!touched.timeList && !!errors.timeList && touched.timeList[index] && (values.timeList[index] == "") ?
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

    return (
        <Form id={"form"+(props.index + 1)}
              className="forms"
              onSubmit={handleSubmit}>
            <div className = "formHead">
            </div>
            <Row form>
                <Col md={12}>
                    <FormGroup>
                        <Label>Medication name </Label>
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
                        <Label>Date from </Label>
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
                        <Label>Date to </Label>
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
                        <Label>Frequency </Label>
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
                            <FormText id="longMessage" color="red">
                                {errors.endDate}
                            </FormText>
                        ) : null}
                </Col>
            </Row>
            <Row form>
                <Col md={12}>
                    <Label>Times taken</Label>
                </Col>
            </Row>
            {layoutTimeListTag}
            <Row form>
                <Col md={4}>
                    <FormGroup check>
                        <Input name = "notifications"
                               type="checkbox"
                               id = {(props.index + 1) + "form-checkbox"}
                               onChange={handleChange}
                               value={values.notification}
                               />
                        <label className = "notification_checkbox" htmlFor = {(props.index + 1) + "form-checkbox"}> </label>
                        <Label >Remind me:</Label>
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <Input type="select"
                           name="remindTime"
                           onChange={handleChange}
                           value={values.remindTime}
                           {...statusSelect}>
                        <option value={0}>at the moment</option>
                        <option value={5}>in 5 minutes</option>
                        <option value={10}>in 10 minutes</option>
                        <option value={15}>in 15 minutes</option>
                        <option value={30}>in half-hour</option>
                        <option value={60}>in 1 hour</option>
                    </Input>
                </Col>
                <Col md={4}>
                    <button className="formSubmit" type="submit"></button>
                </Col>
            </Row>
            <Row form>
                <Col md={12}>
                    <FormGroup>
                        <Label>Special instructions:</Label>
                        <Input type="textarea"
                               name="description"
                               onChange={handleChange}
                               rows={2} cols={48}>
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
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
    validate: values => {
        const errors = {};
        errors.timeList = ["", "", "", "", "", ""];
        if (!values.drugName) {
            errors.drugName = 'Required';
        }
        if (!values.dateFrom) {
            errors.dateFrom = 'Required';
        }
        if (!values.dateTo) {
            errors.dateTo = 'Required';
        }
        if (values.dateTo < values.dateFrom) {
            errors.endDate = 'Start date should not precede end date';
        }
        for (let i = 0; i < values.timeList.length; i++){
            if (!values.timeList[i]){
                errors.timeList[i] = 'Required';
            }
        }
        return errors;
    },
    handleSubmit: () => {},
})(FormikForms);

// const formik = useFormik({
//     initialValues: {
//         drugName: '',
//         startDate: null,
//         endDate: null,
//         freq: ''
//     },
//     validate,
//     onSubmit: values => {
//         alert(JSON.stringify(values, null, 2));
//     },
// });
// return (
//     <form onSubmit={formik.handleSubmit}>
//         <label htmlFor="drugName">Name of drug</label>
//         <input
//             id="drugName"
//             name="drugName"
//             type="text"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.drugName}
//         />
//         {formik.touched.drugName && formik.errors.drugName ? (
//             <div>{formik.errors.drugName}</div>
//         ) : null}
//
//         <br></br>
//         <label htmlFor="startDate">Since</label>
//         <input
//             id="startDate"
//             name="startDate"
//             type="date"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.startDate}
//         />
//         {formik.touched.startDate && formik.errors.startDate ? (
//             <div>{formik.errors.startDate}</div>
//         ) : null}
//
//         <label htmlFor="endDate">Till</label>
//         <input
//             id="endDate"
//             name="endDate"
//             type="date"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.endDate}
//         />
//         {formik.touched.endDate && formik.errors.endDate ? (
//             <div>{formik.errors.endDate}</div>
//         ) : null}
//
//         <br></br>
//         <label htmlFor="freq">Take per day</label>
//         <input
//             id="freq"
//             name="freq"
//             type="text"
//             onChange={formik.handleChange}
//             onBlur={formik.handleBlur}
//             value={formik.values.email}
//         />
//         {formik.touched.freq && formik.errors.freq ? (
//             <div>{formik.errors.freq}</div>
//         ) : null}
//         <br></br>
//         <GenerateButton/>
//     </form>
// );


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