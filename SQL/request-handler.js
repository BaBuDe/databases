var db = require('./db.js');
var _ = require('underscore');


exports.handler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 404;
  var messages = [];

  if(request.method === 'GET' && request.url.split('/')[1] === 'classes' ){
    statusCode = 200;
  }else if(request.method === 'POST'){
    statusCode = 201;
    var body = '';
    request.on('data', function(data){
      body += data;
    });

    //add (JSON.parse(body)) to mySQL server
    //we will need to use db.query(INSERT) to send it over
    request.on('end', function(){
      var message = JSON.parse(body);
      var content = message.text;
      var username = message.username;
      var roomname = message.roomname || 'main';
      var timestamp = 'YEAR ONE';
      var userID;
      var roomID;
      db.query('insert into Rooms set ?', {Roomname: roomname}, function (err, result) {
        if (err) throw error;
        roomID = result.insertID;

        db.query('insert into Users set ?', {Username: username}, function (err, result) {
          if (err) throw error;
          userID = result.insertID;

          db.query('insert into Messages set ?', {Content: content, Timestamp: timestamp}, function (err, result) {
            if (err) throw error;
          });
        });
      });
    });
  } else if(request.method === 'OPTIONS') {
    statusCode = 200;
  }

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";

  response.writeHead(statusCode, headers);

  //use db.query(SELECT) to get data from mySQL server

  var query = db.query('select * from Messages');
  query.on('result', function(message) {
    db.pause();
    var utterance = {};
    utterance.text = message.Content;
    db.query('select Username from Users where id = ?', [message.id_Users], function(result) {
      utterance.username = result.Username;
      db.query('select Roomname from Rooms where id = ?', [message.id_Rooms], function(result) {
        utterance.roomname = result.Roomname;
        messages.push(utterance);
        db.resume();
      });
    });
  });
  // create response object HERE
  query.on('end', function() {
    var messageResponse = {
      results: messages
    };
    response.end(JSON.stringify(messageResponse));
  });

};

var defaultCorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept",
  "Access-Control-Max-Age": 10 // Seconds.
};
