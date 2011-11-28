/**
 * 
 */
var fs = require('fs');

var configuration = require("./configuration");

console.log("trying to create foaf server at "+configuration.port);

createHttpServer(function (req,res) { 
	var path = req.uri.path;
	switch(path) {
	case '/getFoaf' :
		try {
			var fileFoaf = fs.readFileSync('../foaf/' + nomDoc);
		
			res.writeHead(200,{"Content-Type":"application/rdf+xml"});
	        res.write(fileFoaf);
	        res.end();
	        
		} catch(e) {
	        send404(res); 
		}
	case '/' :
		send404(res); 
	}
}).listen(configuration.port);


console.log("server running at "+configuration.port);




	
