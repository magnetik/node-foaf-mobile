/**
 * 
 */
var https = require('https'); 
var fs = require('fs');
var url = require ('url');

var configuration = require("./configuration");

var options = { key: fs.readFileSync('./ssl/privatekey.pem'),   
        		cert: fs.readFileSync('./ssl/certificate.pem')}; 

console.log("trying to create foaf server at "+configuration.port);

https.createServer(options, function (req,res) { 
	console.log("requete GET");
	var path = req.url;
	var fileName = url.parse(path, true).query.name;
	console.log("tente d'acceder a "+ fileName);
	
	try {
		var fileFoaf = fs.readFileSync("foaf/" + fileName + ".xml");
		console.log("envoi du fichier "+ fileName);
		res.writeHead(200,{"Content-Type":"application/rdf+xml"});
		res.write(fileFoaf);
		res.end();

	} catch(e) {
		res.writeHead(404); 
		res.end();
	}
}).listen(configuration.port);


console.log("server foaf running at "+configuration.port);




	
