import React from 'react';
import { useFormik } from 'formik';
import ReactDOM from 'react-dom';
import './index.css';

const validate = values => {
    const errors = {};
    if (!values.drugName) {
        errors.drugName = 'Required';
    }
    if (!values.startDate) {
        errors.startDate = 'Required';
    }
    if (!values.endDate) {
        errors.endDate = 'Required';
    }
    if (values.endDate < values.startDate) {
        errors.endDate = 'Ending date must be later than starting';
    }
    if (!values.freq) {
        errors.freq = 'Required';
    }
    return errors;
};

function App() {
    const formik = useFormik({
        initialValues: {
            drugName: '',
            startDate: null,
            endDate: null,
            freq: ''
        },
        validate,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="drugName">Name of drug</label>
            <input
                id="drugName"
                name="drugName"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.drugName}
            />
            {formik.touched.drugName && formik.errors.drugName ? (
                <div>{formik.errors.drugName}</div>
            ) : null}

            <br></br>
            <label htmlFor="startDate">Since</label>
            <input
                id="startDate"
                name="startDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.startDate}
            />
            {formik.touched.startDate && formik.errors.startDate ? (
                <div>{formik.errors.startDate}</div>
            ) : null}

            <label htmlFor="endDate">Till</label>
            <input
                id="endDate"
                name="endDate"
                type="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.endDate}
            />
            {formik.touched.endDate && formik.errors.endDate ? (
                <div>{formik.errors.endDate}</div>
            ) : null}

            <br></br>
            <label htmlFor="freq">Take per day</label>
            <input
                id="freq"
                name="freq"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
            />
            {formik.touched.freq && formik.errors.freq ? (
                <div>{formik.errors.freq}</div>
            ) : null}
            <br></br>
            <button type="submit">Submit</button>
        </form>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);