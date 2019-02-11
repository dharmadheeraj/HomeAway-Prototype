import PropertyListItem from "./PropertyListItem";
import React, {Component} from "react";
import axios from "axios";
import cookie from "react-cookies";
import connect from "react-redux/es/connect/connect";
import {getOwnerProps, ownerBookings} from "../actions";
import BookingListItem from "./BookingListItem";
import cookies from "react-cookies";


class OwnerProperties extends Component {

    componentDidMount() {
        this.props.getOwnerProps(sessionStorage.getItem('userid'));
    }

    render()
    {
        if (this.props.bookings.length > 0) {

            const PropertyItems = this.props.bookings.map((property) => {
                return <PropertyListItem key={property._id} property={property}/>
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
                    You have no Properties listed
                </div>
            )
        }
    }

}

function mapStateToProps(state) {
    return {
        bookings : state.ownerProperties
    };
}

export default connect(mapStateToProps,{getOwnerProps})(OwnerProperties);
