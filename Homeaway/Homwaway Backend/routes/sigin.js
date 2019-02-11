var express = require('express');
var crypt = require('../crypt');
var {Users} = require("../model/user");


var router = express.Router();


router.post('/loginwithoutpool',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    var sql = "SELECT user_id,username,password FROM user_mdb WHERE username = " +
        mysql.escape(username) + "and password = " + mysql.escape(password);

    var connection = mysql.createConnection({
        port: '3306',
        host: '127.0.0.1',
        user: 'homeaway_user',
        password: 'Homeaway.99',
        database: 'homeaway_user'
    });
    connection.query(sql,function(err,result){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Invalid Credentials");
            console.log(err);
        }else{
            // if(crypt.compareHash(password,result[0].password)){
            if(result.length > 0) {
                res.cookie('cookie', req.body.type, {maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('userid', result[0].user_id, {maxAge: 900000, httpOnly: false, path : '/'});
                res.cookie('username', result[0].username, {maxAge: 900000, httpOnly: false, path : '/'});
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("Successful");
                console.log("successful");
            }
            else
            {
                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                })
                res.end("UnSuccessful");
                console.log("Unsuccessful");
            }
        }
    });
});


router.post('/login',function(req,res){
    var username = req.body.username;
    var password = req.body.password;
    console.log(password);
    console.log(username);


    Users.find({
        username:username
    }).then((docs)=>{
        if(docs.length !== 0) {
            crypt.compareHash(password,docs[0].password, (isMatch,err) => {
                if(isMatch)
                {
                    //res.cookie('cookie', docs[0].type, {maxAge: 900000, httpOnly: false, path: '/'});
                    //res.cookie('userid', docs[0]._id.toString(), {maxAge: 900000, httpOnly: false, path: '/'});
                    //res.cookie('username', docs[0].username, {maxAge: 900000,httpOnly: false,path: '/'});
                    res.writeHead(200, {
                        'Content-Type': 'text/plain'
                    })
                    res.end(JSON.stringify(docs));
                    res.end("Successful");
                    console.log("successful",docs);
                }
                else{
                    res.writeHead(201, {
                        'Content-Type': 'text/plain'
                    })
                    res.end("UnSuccessful");
                    console.log("Sent Invalid result");
                    console.log(err);
                }
            }, (err) => {
                res.writeHead(202, {
                    'Content-Type': 'text/plain'
                })
                res.end("UnSuccessful");
                console.log("Sent Invalid result");
                console.log(err);
            });

        }
        else
        {
            res.writeHead(202, {
                'Content-Type': 'text/plain'
            })
            res.end("UnSuccessful");
            console.log("Sent Invalid result");
            console.log(err);
        }


    })
});


router.post('/createuser',function(req,res){

    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    var type = req.body.type;

    crypt.createHash(password, (hash) => {

        Users.create(
            {
                username : username,
                password : hash,
                email : email,
                type : type
            },(err,doc) => {
                if(err)
                {
                    res.writeHead(201,{
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
                    res.end("Successful");
                    console.log("Successful creation of user : " + doc.insertedId);
                }

            });

    });
});

module.exports = router;

