var {Users} = require('../../Homwaway Backend/model/user');

require("../../Homwaway Backend/mongoose");


function handle_request(msg, callback){
    console.log("In Get Profile Dashboard")

    Users.findByIdAndUpdate(msg.userid,
        {$set:{firstname : msg.firstname,
                lastname : msg.lastname ,
                aboutme : msg.aboutme,
                address : msg.address,
                address2 : msg.address2,
                country : msg.country,
                state : msg.state,
                zip : msg.zip,
                company : msg.company,
                gender : msg.gender,
                school : msg.school,
                hometown : msg.hometown,
                languages : msg.languages}
        },
        {new : true},
        (err, doc) => {
            if (err) {
                console.log("Unable To Update data");
                console.log(null,[]);
            }
            else
            {
                console.log("docs : ",doc);
                callback(null,doc)
            }
        });
};

exports.handle_request = handle_request;


