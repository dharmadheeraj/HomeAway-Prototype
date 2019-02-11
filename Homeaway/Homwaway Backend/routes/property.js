var express = require('express');
var { Property } = require('../model/property_list');
var kafka =  require ("../kafka/client");

var app = express();
var path = require('path');
const fs = require('fs');

var router = express.Router();

router.post('/searchproperty',function(req,res) {

    console.log("Inside serach property Request");

    // kafka.make_request('search_prop',req.body, function(err,results){
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
    //
    //     }
    //
    //
    // });

    Property.find().then((result)=> {

        res.writeHead(200, {'Content-Type': 'text'});
        console.log("result: " + result);
        res.end(JSON.stringify(result));

    })

});


router.post('/getpropertypic/:file(*)',(req, res) => {
    console.log("Inside get propery pic");
    var file = req.params.file;
    var fileLocation = path.join(__dirname,'..','uploads/property/' + file );
    var base64img = [];

    fs.readdirSync(fileLocation).forEach(file => {
        console.log(file);
        var img = fs.readFileSync(fileLocation + '/' + file);
        base64img.push(new Buffer(img).toString('base64'));

    })

    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(JSON.stringify(base64img));

});


router.post('/getpropertypicsingle/:file(*)',(req, res) => {
    console.log("Inside get profile pic");
    var file = req.params.file;
    var fileLocation = path.join(__dirname,'..' ,'uploads/property/' + file );
    var base64img = '';

    fs.readdirSync(fileLocation).forEach(file => {
        console.log(file);
        var img = fs.readFileSync(fileLocation + '/' + file);
        base64img = new Buffer(img).toString('base64');

    })

    res.writeHead(200, {'Content-Type': 'image/jpg' });
    res.end(base64img);

});


router.get('/getsingle',function (req,res) {
    console.log('Inisde get Single Property');
    console.log(req.query.id);

    // kafka.make_request('get_single',req.query.id, function(err,results){
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
    //
    // });

    Property.findById(req.query.id).then((docs) =>{
        if (docs) {
            res.writeHead(200, {
                'Content-Type': 'text/plain'
            })
            console.log("Successful:",docs);
            res.end(JSON.stringify(docs));

        } else {
            res.writeHead(400, {
                'Content-Type': 'text/plain'
            })
            res.end("No Data");
            console.log("Unable get data");
            console.log(err);
        }
    } );

});


router.get('/getownerproperties',function (req,res) {
    console.log('Inside GET owner properties');
    console.log(req.query.id);

    // kafka.make_request('get_ownerprop',req.query.id, function(err,results){
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
    //
    // });

    Property.find(
        {owner_id : req.query.id}).then((docs) =>{
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

module.exports = router;