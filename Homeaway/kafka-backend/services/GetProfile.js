var {Users} = require('../../Homwaway Backend/model/user');

require("../../Homwaway Backend/mongoose");


function handle_request(msg, callback){
    console.log("In Get Profile Function");

    Users.findById(msg).then((docs)=>{
        console.log("In Get Profile Query");
        if(docs!=null) {
            console.log("docs : ",docs[0]);
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


