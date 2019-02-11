var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost:3001");

//Unit Test begin
describe("MochaTest", function() {

        //Login
        it("should login user", function(done) {
            server
                .post("/login")
                .send({ username: "Dharma", password: "Dharma.99" })
                .expect(200)
                .end(function(err, res) {
                    console.log("Status: ", res.status);
                    res.status.should.equal(200);
                    done();
                });
        });

        //Signup
        it("should add new user", function(done) {
            server
                .post("/createuser")
                .send({
                    username: "test77",
                    email: "test@gmail.com",
                    password: "pass",
                    type: "traveller"
                })
                .expect(200)
                .end(function(err, res) {
                    console.log("Status: ", res.status);
                    res.status.should.equal(200);
                    done();
                });
        });


        //Search Results
        it("Should get property list based on search", function(done) {
            server
                .post("/searchproperty")
                .send
                ({
                    place: "San",from :"2018-09-23" , to:"2018-09-28", count: 2
                })
                .expect(200)
                .end(function(err, res) {
                    console.log("Status: ", res.status);
                    res.status.should.equal(200);
                    done();
                });
        });


        //Property Page
        it("Should get single property", function(done) {
            server
                .get("/getsingle")
                .query({ id: "5bdfc1017940b630a0c30f06"})
                .expect(200)
                .end(function(err, res) {
                    console.log("Status: ", res.status);
                    res.status.should.equal(200);
                    done();
                });
        });

        //Owner Bookings
        it("should get owner bookings", function(done) {
            server
                .get("/getownerbookings")
                .query({ id : "5bdfbf637940b630a0c30f05"  })
                .expect(200)
                .end(function(err, res) {
                    console.log("Status: ", res.status);
                    res.status.should.equal(200);
                    done();
                });
        });

    //
    it("should get User bookings", function(done) {
        server
            .get("/getuserbookings")
            .query({ id : "5bde8c7a8e03984c3cb3f69b"  })
            .expect(200)
            .end(function(err, res) {
                console.log("Status: ", res.status);
                res.status.should.equal(200);
                done();
            });
    });
});