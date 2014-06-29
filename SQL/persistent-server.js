var http = require('http');
var handler = require('./request-handler.js').handler;

var port = 3000;
var ip = '127.0.0.1';

var server = http.createServer(handler);
console.log("IT'S ALIVE");

server.listen(port, ip);
