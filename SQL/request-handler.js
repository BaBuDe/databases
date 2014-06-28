var db = require('./db.js');

exports.handler = function(request, response) {

  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode = 404;


  if(request.method === 'GET' && request.url.split('/')[1] === 'classes' ){
    statusCode = 200;
  }else if(request.method === 'POST'){
    statusCode = 201;
    var body = '';
    request.on('data', function(data){
      body += data;
    });

    request.on('end', function(){
      //add (JSON.parse(body)) to mySQL server
      //we will need to use db.query(INSERT) to send it over
    });
  } else if(request.method === 'OPTIONS') {
    statusCode = 200;
  }

  var headers = defaultCorsHeaders;

  headers['Content-Type'] = "application/json";

  response.writeHead(statusCode, headers);

  //use db.query(SELECT) to get data from mySQL server
  //
  // create response object HERE
  // var messages = {
  //   results: <message data>
  // };

  response.end(JSON.stringify(messages));
};

var defaultCorsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "content-type, accept",
  "Access-Control-Max-Age": 10 // Seconds.
};
