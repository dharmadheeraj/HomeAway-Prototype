import React, { Component } from 'react';
import Navbarlogin from "./Navbarlogin";
//import UserForm from "./UserForm";
import UserForm from "../containers/container_userform";
import '../css/Userlogin.css';
import {Redirect} from "react-router-dom";
import cookies from "react-cookies";
import { connect } from "react-redux";


class UserLogin extends Component {


    constructor(props){
        super(props);
    }


    render()
    {
        var content = null;

        if(!this.props.user[0]._id)
        {
            content = (
                <div>
                    <Navbarlogin/>
                    <UserForm />
                </div>
            )
        }
        else
        {
            content = (
                <Redirect to= "/"/>
            )
        }

            return (


                <div id="Userlogin" className="jumbotron jumbotron-fluid">

                    {content}
                </div>
            )

    }
}

function mapStateToProps(state) {
    return { user : state.user };
}

export default connect(mapStateToProps)(UserLogin);

