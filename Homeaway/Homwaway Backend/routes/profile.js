var express = require('express');
var {Users} = require("../model/user");
var kafka =  require ("../kafka/client");



var router = express.Router();

router.get('/getprofile',function (req,res) {

    console.log('Inisde GET profile');
    console.log(req.query.id);

    // kafka.make_request('get_profile',req.query.id, function(err,results){
    //     console.log(results);
    //     if (err){
    //                 res.writeHead(400, {
    //         'Content-Type': 'text/plain'
    //     })
    //     res.end("Unable to get data");
    //     console.log("Unable get data");
    //     console.log(err);
    //     }else{
    //         res.writeHead(200, {
    //             'Content-Type': 'text/plain'
    //         })
    //         console.log(results);
    //         res.end(JSON.stringify(results));
    //
    //     }
    //
    //
    // });

    Users.findById(req.query.id).then((docs)=>{
        console.log("In Get Profile Query");
        if (docs) {
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    console.log(docs);
                    res.end(JSON.stringify(docs));
                } else {
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("Unable to get data");
                    console.log("Unable get data");
                    console.log(err);
                }
    });
});


router.post('/updateprofile', (req, res) => {
    console.log("Inside Update profile");

    console.log("Req Data : ",req.body);

    var data = req.body;

    Users.findByIdAndUpdate(data.userid,
        {$set:{firstname : data.firstname,
                lastname : data.lastname ,
                aboutme : data.aboutme,
                address : data.address,
                address2 : data.address2,
                country : data.country,
                state : data.state,
                zip : data.zip,
                company : data.company,
                gender : data.gender,
                school : data.school,
                hometown : data.hometown,
                languages : data.languages}
        }, {new : true}).then((docs)=>{
        console.log("In Update Profile Query");
        if (docs) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Unable to get data");
            console.log("Unable get data");
            console.log(err);
        }else{
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            res.end("Successful");
            console.log("Successful updated");
            console.log("Document Updated : ",docs);

        }

    });

});

router.get('/getaccount',function (req,res) {
    console.log('Inisde GET account');
    console.log(req.query.id);

    kafka.make_request('traveller_dashboard', req.query.id, function (err, results) {
        console.log('in result');
        console.log(results);
        if (err) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Unable to get data");
            console.log("Unable get data");
            console.log(err);
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log(results);
            res.end(JSON.stringify(results));

        }

    });
});


router.post('/updateaccount', (req, res) => {
    console.log("Inisde post account update");

    console.log("Req Data : ",req.body);

    var data = req.body;

    Users.find({
        email : data.email
    }).then((docs)=>{
        if(docs!=null) {
            crypt.compareHash(data.curpass,docs[0].password, (isMatch) => {
                if(isMatch)
                {
                    crypt.createHash(data.newpass, (hash) => {
                        Users.findByIdAndUpdate(docs[0]._id,
                            {$set:{password : hash}},
                            {new : true},
                            (err, doc) => {
                                if (err) {
                                    res.writeHead(400, {
                                        'Content-Type': 'text/plain'
                                    })
                                    res.end("Unable to update data");
                                    console.log("Unable update data");
                                    console.log(err);
                                }
                                else {
                                    res.writeHead(200, {
                                        'Content-Type': 'text/plain'
                                    })
                                    res.end("Successful Update");
                                    console.log("Successful updated password for user : " + doc[0].user_id);
                                    console.log(doc);
                                }
                            }
                        );
                    });
                }
                else{
                    res.writeHead(400, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("UnSuccessful");
                    console.log("Did not update password");
                }
            });
        }
    })
});


module.exports = router;
