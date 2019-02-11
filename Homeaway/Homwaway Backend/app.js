
var express = require('express');

const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');

var cookieParser = require('cookie-parser');
var mysql = require('mysql');

var path = require('path');
var logger = require('morgan');

//require express middleware body-parser
var bodyParser = require('body-parser');
//require express session
var session = require('express-session');

var cors = require('cors');

var pool = require('./connection');

var app = express();

var crypt = require('./crypt');

var { Users } = require('./model/user');
var { Booking } = require('./model/property_booking');
var { Property } = require('./model/property_list');

var mongoose = require ("./mongoose.js");

const ROOT_URL = "http://localhost:3000";


app.use(logger('dev'));
app.use(cors({ origin: ROOT_URL, credentials: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

//use express session to maintain session data
app.use(session({
    secret              : 'homeaway_dharma',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

const signin = require('./routes/sigin');
const profile = require('./routes/profile');
const property = require('./routes/property');
const bookings = require('./routes/bookings');

app.use(signin);
app.use(profile);
app.use(property);
app.use(bookings);

// app.use(bodyParser.urlencoded({
//     extended: true


//Allow Access Control
/*
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
*/

const multer = require('multer');
const fs = require('fs');
//var exists = require('fs-exists-sync');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body.propname);
        const dir = `./uploads/property/${req.body.propname}`
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
            console.log(file);
        const newFilename = `${file.originalname}`;
        cb(null, newFilename);
    },
});

const upload = multer({ storage });

app.post('/uploadproperty',upload.array('proppics',5), (req, res) => {

   var data = JSON.parse(req.body.propdata);


        Property.create(
        {
            owner_id : data.userid,
            name :data.propname,
            type : data.proptype,
            description : data.propdesc,
            place : data.location,
            capacity : data.capacity,
            bed : data.bed,
            bath : data.bath,
            price : data.price,
            from_date : data.from,
            to_date : data.to,
            booking_options : data.bookingoptions,
            min_stay: data.minstay
        },(err,doc) => {
            if(err)
            {
                res.writeHead(400,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Unable to create user");
                console.log("Unable to create user");
                console.log(err);
            }
            else
            {
                res.writeHead(200,{
                    'Content-Type' : 'text/plain'
                })
                res.end("Successfully uploaded Property");
                console.log("Successful uploading")
            }

        });

});

const storagepic = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log('Request to multer:' + req.body.description);
        cb(null, './uploads/profile');
    },
    filename: (req, file, cb) => {

        const newFilename = `profile_${req.body.description}.jpg`;
        cb(null, newFilename);
    },
});

const uploadpic = multer({ storage : storagepic });

app.post('/uploadpic',uploadpic.single('selectedFile'), (req, res) => {
    //console.log("Req : ",req);
    console.log("Req File : ",req.file);
    console.log("REq Desc: ", req.body.description);

    res.send();
});

app.post('/getprofilepic/:file(*)',(req, res) => {
    console.log("Inside get profile pic");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads/profile',file);
    if (fs.existsSync(fileLocation)) {
        var img = fs.readFileSync(fileLocation);
        var base64img = new Buffer(img).toString('base64');
        res.writeHead(200, {'Content-Type': 'image/jpg' });
        res.end(base64img);
    }
    else
    {
        res.end("");
    }

});

app.use("/graphql",graphqlHTTP({
    schema,
    graphiql: true
}));


app.listen(3001, function () {
    console.log("Server listening on port 3001");

});





