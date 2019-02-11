import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Redirect, withRouter} from "react-router-dom";
import { submitlogin } from "../actions/index";
import '../css/Userlogin.css';
import Navbarlogin from "../components/Navbarlogin";
import cookies from "react-cookies";

class UserForm extends Component {

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
        this.props.submitlogin(values, (res) => {
                if (res.status === 200) {
                    sessionStorage.setItem('userid', res.data[0]._id);
                    sessionStorage.setItem('username', res.data[0].username);
                    sessionStorage.setItem('cookie', res.data[0].type);
                    // cookies.save('cookie', res.data[0].type, {maxAge: 900000, httpOnly: false, path: '/'});
                    // cookies.save('userid', res.data[0]._id, {maxAge: 900000, httpOnly: false, path: '/'});
                    // cookies.save('username', res.data[0].username, {maxAge: 900000, httpOnly: false, path: '/'});
                    this.props.history.push("/");

                }
                else {
                    alert('Please enter valid credentials');

                }
            }
        );
    }


    render() {
        const { handleSubmit } = this.props;


        if(sessionStorage.getItem('cookie') === 'traveller')
        {
            return  <Redirect to= "/"/>
        }
        else {
            return(
                <div id="OwnerLogin" className="jumbotron jumbotron-fluid">
                    <Navbarlogin />
                <div className="login-container">
                    <div className="row">
                        <div className=" loginimg col-lg-6 col-md-6 col-sm-6 hidden-xs">
                            <img src={require('../images/OwnerLogin.png')} style={{height: '100%'}} alt="Owner"/>
                        </div>
                    <div className="col-lg-4 col-md-5 col-sm-6 col-xs-12">
                        <div className="login-form">
                            <h1> Owner Login </h1>
                            <h4>Dont have an account?</h4> <Link to="/OwnerSignup" className="btn btn-link">Signup</Link>
                            <hr></hr>


                                    <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                                        <Field
                                            label="Username"
                                            name="username"
                                            type="text"
                                            component={this.renderField}
                                        />

                                        <Field
                                            label="Password"
                                            name="password"
                                            type="password"
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

    // If errors is empty, the form is fine to submit
    // If errors has *any* properties, redux form assumes form is invalid
    return errors;
}

function mapStateToProps(state) {
    return { user : state.user };
}

export default reduxForm({
    validate,
    form: 'LoginForm'

})(connect(mapStateToProps, {submitlogin})(UserForm));
