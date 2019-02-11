import React,{ Component } from 'react';
import '../css/Dashboard.css'
import Inbox from "./Inbox";
import Profile from "./Profile";
import Account from "./Account";
import Navbarhome from "./Navbarhome";
import cookies from 'react-cookies';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
import Redirect from "react-router-dom/es/Redirect";
import UserBookings from "./UserBookings";
import connect from "react-redux/es/connect/connect";


 class Dashboard extends Component{

    constructor(props){
        super(props);

        this.state = {
            //userid : cookies.load('userid')
            userid : this.props.user._id
        }
    }

    render()
    {
        if(!(sessionStorage.getItem('cookie') === 'traveller'))
        {
            return(
                <Redirect to='/Userlogin'/>
            )
        }
        else {
            return (
                <div>
                    <Navbarhome/>
                    <div className="container-dashboard">
                        <nav>
                            <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "inbox") && ("active"))  }><Link to={"/Dashboard/inbox/" + this.props.user._id}>Inbox</Link></a>
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "mytrips") && ("active"))  }><Link to={"/Dashboard/mytrips/" + this.props.user._id}>My Trips</Link></a>
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "profile") && ("active"))  }><Link to={"/Dashboard/profile/" + this.props.user._id}>Profile</Link></a>
                                <a className={ "nav-item nav-link " + ((this.props.match.params.page === "account") && ("active"))  }><Link to={"/Dashboard/account/" + this.props.user._id}>Account</Link></a>
                            </div>
                        </nav>
                        <div className="tab-content" id="nav-tabContent">
                            { (this.props.match.params.page === "inbox") && (<div className="tab-pane fade show active" id="nav-Inbox" role="tabpanel"
                                 aria-labelledby="nav-Inbox-tab"><Inbox/>
                            </div>) }
                            { (this.props.match.params.page === "mytrips") && (<div className="tab-pane fade show active" id="nav-trips" role="tabpanel"
                                 aria-labelledby="nav-trips-tab"><UserBookings userid={this.props.user._id} />
                            </div>)}
                            { (this.props.match.params.page === "profile") && (<div className="tab-pane fade show active" id="nav-profile" role="tabpanel"
                                 aria-labelledby="nav-profile-tab"><Profile userid={this.props.user._id}/>
                            </div>)}
                            { (this.props.match.params.page === "account") && (<div className="tab-pane fade show active" id="nav-Account"role="tabpanel"
                                aria-labelledby="nav-profile-tab"><Account userid={this.props.user._id}/>
                            </div>)}
                        </div>
                    </div>
                </div>
            )
         }
    }
}

function mapStateToProps(state) {
    return { user : state.user };
}

export default connect(mapStateToProps)(Dashboard);
