var http = require('http');
var handler = require('./request-handler.js');

var port = 2001;
var ip = '127.0.0.1';

var server = http.createSever(handler);
console.log("IT'S ALIVE");

server.listen(ip, port);
