var http = require('http');
var request;

var port = 2001;
var ip = '127.0.0.1';

var server = http.createSever(request);
console.log("IT'S ALIVE");

server.listen(ip, port);
