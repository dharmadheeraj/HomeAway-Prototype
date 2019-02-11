import React,{ Component } from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage.js';
import UserLogin from './components/UserLogin.js';
import OwnerLogin from './components/OwnerLogin.js';
import Dashboard from "./components/Dashboard";
import PropertyPage from "./components/PropertyPage";
import OwnerDashboard from "./components/OwnerDashboard";
import ListProperty from "./components/ListProperty";
import container_userform from "./containers/container_userform";
import container_usersignup from "./containers/content_usersignup";
import container_ownerlogin from "./containers/container_ownerlogin";
import container_ownersignup from "./containers/container_ownersignup";


class Main extends Component{

    render()
    {
        return (
            <div>
                {/*Render Different Component based on Route*/}
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/Userlogin" component={container_userform}/>
                <Route exact path="/UserSignup" component={container_usersignup}/>
                <Route exact path="/Ownerlogin" component={container_ownerlogin}/>
                <Route exact path="/OwnerSignup" component={container_ownersignup}/>
                <Route exact path="/Dashboard/:page/:id" component={Dashboard}/>
                <Route exact path="/OwnerDashboard/:page/:id" component={OwnerDashboard}/>
                <Route path="/Listproperty" component={ListProperty}/>
                <Route exact path="/property/:id/:from/:to"  component={PropertyPage}/>
            </div>
        );
    }
};

export default Main;
