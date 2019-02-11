var connection =  new require('./kafka/Connection');

var Books = require('./services/books.js');
var GetProfile = require("./services/GetProfile");
var UpdateProfile = require("./services/UpdateProfile");
var UserBooking = require("./services/UserBooking");
var OwnerBooking = require("./services/OwnerBooking");
var BookProp = require("./services/BookProp");
var SearchProp = require("./services/SearchProp");
var GetSingle = require("./services/GetSingle");
var GetOwnerProp = require("./services/GetOwnerProp");




function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("post_book",Books);
handleTopicRequest("get_profile",GetProfile);
handleTopicRequest("update_profile",UpdateProfile);
handleTopicRequest("user_booking",UserBooking);
handleTopicRequest("owner_booking",OwnerBooking);
handleTopicRequest("book_prop",BookProp);
handleTopicRequest("search_prop",SearchProp);
handleTopicRequest("get_single",GetSingle);
handleTopicRequest("get_ownerprop",GetOwnerProp);