var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Booking = mongoose.model('bookings',{
    booking_id :{
        type : Schema.ObjectId
    },
    user_id : {
        type : Schema.ObjectId
    },
    owner_id : {
        type : Schema.ObjectId
    },
    property_id : Schema.ObjectId,
    property : Object,
    booked_from : {
        type : Date
    },
    booked_to : {
        type : Date
    },
    booked_on : {
        type : Date,
        default: Date.now
    }
});

module.exports = {Booking};