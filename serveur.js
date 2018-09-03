var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res){
	var params = querystring.parse(url.parse(req.url).query);
	var page = url.parse(req.url).pathname;
	console.log(page);
	res.writeHead(200);
	res.write('Hi everybody, how do ya da di dou ka da badoo');
	if ('prenom' in params && 'nom' in params) {
		res.write('Your name is' + params['prenom'] + ' ' + params['nom']);
	}
	res.end();
});
server.listen(8080);

