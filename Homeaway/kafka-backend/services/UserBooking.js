var { Booking } = require('../../Homwaway Backend/model/property_booking');

require("../../Homwaway Backend/mongoose");


function handle_request(msg, callback){

    console.log("In Get User Bookings Function");

    Booking.find(
        {user_id : msg}).then((docs) =>{
        console.log("In Get User Bookings Query");
        if(docs!=null) {
            console.log("docs : ",docs);
            callback(null,docs)
        }
        else
        {
            console.log("Unable to get data");
            console.log(null,[]);

        }
    });
};

exports.handle_request = handle_request;


