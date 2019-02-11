var express = require('express');
var { Booking } = require('../model/property_booking');
var { Property } = require('../model/property_list');
var kafka =  require ("../kafka/client");

var router = express.Router();

router.get('/getuserbookings',function (req,res) {
    console.log('Inisde GET user bookings');
    console.log(req.query.id);

    // kafka.make_request('user_booking',req.query.id, function(err,results){
    //     console.log(results);
    //     if (err){
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Unable to get data");
    //         console.log("Unable get data");
    //         console.log(err);
    //     }else{
    //         res.writeHead(200, {
    //             'Content-Type': 'text/plain'
    //         })
    //         console.log(results);
    //         res.end(JSON.stringify(results));
    //     }
    // });

    Booking.find(
        {user_id : req.query.id}).then((docs) =>{
        if (!docs) {
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
            console.log(docs);
            res.end(JSON.stringify(docs));
        }
    });
});

router.get('/getownerbookings',function (req,res) {
    console.log('Inisde GET owner bookings');
    console.log(req.query.id);

    // kafka.make_request('owner_booking',req.query.id, function(err,results){
    //     console.log(results);
    //     if (err){
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Unable to get data");
    //         console.log("Unable get data");
    //         console.log(err);
    //     }else{
    //         res.writeHead(200, {
    //             'Content-Type': 'text/plain'
    //         })
    //         console.log(results);
    //         res.end(JSON.stringify(results));
    //     }
    // });
    //
    Booking.find(
        {'property.owner_id' : req.query.id}).then((docs) =>{
        if (!docs) {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("Unable to get data");
            console.log("Unable get data");
            console.log(err);
        }else {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log(docs);
            res.end(JSON.stringify(docs));
        }
    });

});

router.post('/bookprop',(req,res)=> {

    console.log(req.body);

    // kafka.make_request('book_prop',req.body, function(err,results){
    //     console.log(results);
    //     if (err){
    //         res.writeHead(400, {
    //             'Content-Type': 'text/plain'
    //         })
    //         res.end("Unable to get data");
    //         console.log("Unable get data");
    //         console.log(err);
    //     }else{
    //         res.writeHead(200, {
    //             'Content-Type': 'text/plain'
    //         })
    //         console.log(results);
    //         res.end("Successfully Booked Property");
    //     }
    // });

        Property.findById(req.body.propid).then((docs) => {
            Booking.create(
                {
                    user_id: req.body.user_id,
                    owner_id: req.body.owner_id,
                    property_id: req.body.propid,
                    property : docs,
                    booked_from: req.body.from,
                    booked_to: req.body.to

                }, (err, doc) => {
                    if (err) {
                        res.writeHead(400, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Unable to create user");
                        console.log("Unable to create user");
                        console.log(err);
                    }
                    else {
                        res.writeHead(200, {
                            'Content-Type': 'text/plain'
                        })
                        res.end("Successfully Booked Property");
                        console.log("Successfully Booked Property : ", doc.insertedId);
                    }

                });
        });

});


module.exports = router;