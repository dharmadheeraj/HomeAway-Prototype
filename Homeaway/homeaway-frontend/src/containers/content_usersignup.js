import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { submitsignup } from "../actions/index";
import '../css/Userlogin.css';
import Navbarlogin from "../components/Navbarlogin";

class UserSignup extends Component {

    //Define component that you want to render
    renderField(field) {
        const { meta: { touched, error } } = field;
        const className = `form-group ${touched && error ? "has-danger" : ""}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input className="form-control w-35 ml-5" type={field.type} {...field.input} />
                <div className="text-help">
                    {touched ? error : ""}
                </div>
            </div>
        );
    }
    /*Action call
    Whenever onSubmit event is triggered, execute an action call called createBook
    */
    onSubmit(values) {
        console.log(values);
        values.type = "traveller";
        this.props.submitsignup(values, (res) => {
            if(res.status === 200)
            {
                alert('User Created');
                this.props.history.push("/Ownerlogin");

            }
            else
            {
                alert('Unable to create User');

            }

        });
    }

    render() {
        const { handleSubmit } = this.props;

        return (
            <div id="Userlogin" className="jumbotron jumbotron-fluid">
                <div>
                    <Navbarlogin/>
                    <div className="Userlogin-container">
                        <div className="col-lg-12 col-md-6 col-sm-6 col-xs-12 align-content-center">
                            <div className="login-form">
                                <h1> Taveller Signup </h1>
                                <h4>Already have an account?</h4>
                                <Link to="/Userlogin" className="btn btn-link">Login</Link>
                                <hr></hr>


                        <form onSubmit={ handleSubmit(this.onSubmit.bind(this))}>

                            <Field
                                label="Username"
                                name="username"
                                type="text"
                                component={this.renderField}
                            />

                            <Field
                                label="password"
                                name="password"
                                type="password"
                                component={this.renderField}
                            />

                            <Field
                                label="email"
                                name="email"
                                type="email"
                                component={this.renderField}
                            />
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <Link to="/" className="btn btn-danger">Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            </div>
        );
    }
}

function validate(values) {

    const errors = {};

    // Validate the inputs from 'values'
    if (!values.username) {
        errors.username = "Enter an username";
    }
    if (!values.password) {
        errors.password = "Enter password";
    }
    if (!values.email) {
        errors.password = "Enter Email";
    }

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

export default reduxForm({
    validate,
    form: "Signupform"
})(connect(null, { submitsignup })(UserSignup));
