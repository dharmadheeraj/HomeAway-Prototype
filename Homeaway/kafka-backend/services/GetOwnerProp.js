var { Property } = require('../../Homwaway Backend/model/property_list');

require("../../Homwaway Backend/mongoose");


function handle_request(msg, callback){
    console.log("In  Get Owner Properties Function");

    Property.find(
        {owner_id : msg}).then((docs) =>{
        console.log("In Get Owner Properties Query");
        if(docs!=null) {
            console.log("docs : ",docs);
            callback(null,docs)
        }
        else
        {
            console.log("Unable get data");
            console.log(null,[]);

        }
    });

};

exports.handle_request = handle_request;


