var { Property } = require('../../Homwaway Backend/model/property_list');

require("../../Homwaway Backend/mongoose");


function handle_request(msg, callback){

    console.log("In Search Properties Function :",msg);

    const query = {place: { $regex: msg.place , $options : 'i' }, from_date : {$lte:msg.from},to_date : {$gte:msg.to},capacity:{$gte:msg.count}};
    Property.find(query).then((docs) => {
        console.log("In Search Properties Query : ",query);
        if (docs != null) {
            console.log("docs : ", docs);
            callback(null, docs)
        }
        else {
            console.log("Unable to get data");
            callback(null, []);

        }
    });
};

exports.handle_request = handle_request;


