var http = require('http')

var server = http.createServer(function(req, res){
	res.writeHead(200);
	res.end('Hi everybody, how do ya da di dou ka da badoo');

});
server.listen(8080);