var { Booking } = require('../../Homwaway Backend/model/property_booking');
var { Property } = require('../../Homwaway Backend/model/property_list');

require("../../Homwaway Backend/mongoose");


function handle_request(msg, callback){
    console.log("In Book Prop Function");


    Property.findById(msg.propid).then((docs) => {
        Booking.create(
            {
                user_id: msg.user_id,
                owner_id: msg.owner_id,
                property_id: msg.propid,
                property : docs,
                booked_from: msg.from,
                booked_to: msg.to

            }, (err, doc) => {
                console.log("In Book Prop Query");
                if(docs!=null) {
                    console.log("docs : ",doc);
                    callback(null,doc)
                }
                else
                {
                    console.log("Unable to get data");
                    console.log(null,[]);

                }

            });
    });

};

exports.handle_request = handle_request;




