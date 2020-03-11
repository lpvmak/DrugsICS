import {withFormik} from "formik";
import React from "react";

export function Form(props) {
    // const validate = values => {
    //     const errors = {};
    //     if (!values.drugName) {
    //         errors.drugName = 'Required';
    //     }
    //     if (!values.startDate) {
    //         errors.startDate = 'Required';
    //     }
    //     if (!values.endDate) {
    //         errors.endDate = 'Required';
    //     }
    //     if (values.endDate < values.startDate) {
    //         errors.endDate = 'Ending date must be later than starting';
    //     }
    //     if (!values.freq) {
    //         errors.freq = 'Required';
    //     }
    //     return errors;
    // };

    const { values, handleChange, onChange } = props;


    React.useEffect(() => {
        if (onChange) {
            onChange(props.index, values);
        }
    }, [values]);

    return (
        <div className={"form"}>
            <label>Name </label>
            <input name="drugName" value={values.drugName} onChange={handleChange} />
            <br/>
            <label>From </label>
            <input name="dateFrom"
                type="date"
                onChange={handleChange}
                value={values.dateFrom}
            />
            <label>To </label>
            <input name="dateTo"
                   type="date"
                   onChange={handleChange}
                   value={values.dateTo}
            />
            <label>Dosage </label>
            <select name="dosage" onChange={handleChange} value={values.dosage}>
                <option>1</option>
                <option>2</option>
                <option defaultChecked={1}>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
            </select>
            <br/>
            {function (num, case1, case2, case3, case4, case5, case6) {
                    switch (num) {
                        case case1:
                            return  (
                                <div className = {"time"}>
                                    <label>Time </label>
                                    <input name="timeList[0]" type="time" value={values.timeList[0]} onChange={handleChange} />
                                </div>
                            );
                        case case2:
                            return  (
                                <div className = {"time"}>
                                    <label>Time </label>
                                    <input name="timeList[0]" type="time" value={values.timeList[0]} onChange={handleChange} />
                                    <input name="timeList[1]" type="time" value={values.timeList[1]} onChange={handleChange} />
                                </div>
                            );
                        case case3:
                            return  (
                                <div className = {"time"}>
                                    <label>Time </label>
                                    <input name="timeList[0]" type="time" value={values.timeList[0]} onChange={handleChange} />
                                    <input name="timeList[1]" type="time" value={values.timeList[1]} onChange={handleChange} />
                                    <input name="timeList[2]" type="time" value={values.timeList[2]} onChange={handleChange} />
                                </div>
                            );
                        case case4:
                            return  (
                                <div className = {"time"}>
                                    <label>Time </label>
                                    <input name="timeList[0]" type="time" value={values.timeList[0]} onChange={handleChange} />
                                    <input name="timeList[1]" type="time" value={values.timeList[1]} onChange={handleChange} />
                                    <input name="timeList[2]" type="time" value={values.timeList[2]} onChange={handleChange} />
                                    <br/>
                                    <input name="timeList[3]" type="time" value={values.timeList[3]} onChange={handleChange} />
                                </div>
                            );
                        case case5:
                            return  (
                                <div className = {"time"}>
                                    <label>Time </label>
                                    <input name="timeList[0]" type="time" value={values.timeList[0]} onChange={handleChange} />
                                    <input name="timeList[1]" type="time" value={values.timeList[1]} onChange={handleChange} />
                                    <input name="timeList[2]" type="time" value={values.timeList[2]} onChange={handleChange} />
                                    <br/>
                                    <input name="timeList[3]" type="time" value={values.timeList[3]} onChange={handleChange} />
                                    <input name="timeList[4]" type="time" value={values.timeList[4]} onChange={handleChange} />
                                </div>
                            );
                        case case6:
                            return  (
                                <div className = {"time"}>
                                    <label>Time </label>
                                    <input name="timeList[0]" type="time" value={values.timeList[0]} onChange={handleChange} />
                                    <input name="timeList[1]" type="time" value={values.timeList[1]} onChange={handleChange} />
                                    <input name="timeList[2]" type="time" value={values.timeList[2]} onChange={handleChange} />
                                    <br/>
                                    <input name="timeList[3]" type="time" value={values.timeList[3]} onChange={handleChange} />
                                    <input name="timeList[4]" type="time" value={values.timeList[4]} onChange={handleChange} />
                                    <input name="timeList[5]" type="time" value={values.timeList[5]} onChange={handleChange} />
                                </div>
                            );
                        default:
                            return <div> </div>;
                    }
                }.call(this, values.dosage, "1", "2", "3", "4", "5", "6")}
            <input name = "notifications" onChange={handleChange} value={values.notification} type="checkbox"/>
            <label>Remind me</label>
            {
                function (active, case1, case2) {
                    switch (active) {
                        case case1:
                            return (
                                <select name="remindTime" onChange={handleChange} value={values.remindTime}>
                                    <option value={0}>Immediately</option>
                                    <option value={5}>5 minutes</option>
                                    <option value={10}>10 minutes</option>
                                    <option value={15}>15 minutes</option>
                                    <option value={30}>half-hour</option>
                                    <option value={60}>1 hour</option>
                                    <option value={120}>2 hour</option>
                                </select>
                            );
                        case case2:
                            return (
                                <select name="remindTime" onChange={handleChange} value={values.remindTime} disabled>
                                    <option value={0}>Immediately</option>
                                    <option value={5}>5 minutes</option>
                                    <option value={10}>10 minutes</option>
                                    <option value={15}>15 minutes</option>
                                    <option value={30}>half-hour</option>
                                    <option value={60}>1 hour</option>
                                    <option value={120}>2 hour</option>
                                </select>
                            );
                        default:
                            console.log("def");
                            return;
                    }
                }.call(this, values.notifications, true, false)
            }
            <br/>
            <label>Comment</label>
            <textarea name="description" onChange={handleChange} rows={4} cols={48}></textarea>
        </div>
    );
}

export default withFormik({
    mapPropsToValues: () => {
        return {
            drugName: "",
            dateFrom: "",
            dateTo: "",
            dosage: "3",
            timeList: [],
            notifications: false,
            remindTime: "0",
            description: ""
        };
    }
})(Form);

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
//}
