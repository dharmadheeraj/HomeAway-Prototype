import React,{ Component } from 'react';
import BookingListItem from "./BookingListItem";
import axios from 'axios';
import connect from "react-redux/es/connect/connect";
import {userBookings} from "../actions";
import cookies from "react-cookies";


class UserBookings extends Component {


    componentDidMount() {
        this.props.userBookings(sessionStorage.getItem('userid'));
    }


    render() {
        if (this.props.bookings.length > 0) {

            const PropertyItems = this.props.bookings.map((property) => {
                return <BookingListItem key={property._id} property={property}/>
            });


            return (
                <div className='row'>
                    <ul className="col-md-8 list-group">
                        {PropertyItems}
                    </ul>
                </div>
            )
        }
        else {
            return (
                <div className='row'>
                    You have no Bookings listed
                </div>
            )
        }
    }
}

function mapStateToProps(state) {
    return {
        bookings : state.userBookings
    };
}

export default connect(mapStateToProps,{userBookings})(UserBookings);

