// Required middleware
var connect = require("connect"),
	http = require("http"),
	socketIO = require("socket.io"),
	olives = require("olives"),
	CouchDBTools = require("couchdb-emily-tools");

var io = socketIO.listen(
	http.createServer(
		connect()
			.use(connect.responseTime())
			.use(function (req, res, next) {
				res.setHeader("Server", "node.js/" + process.versions.node);
				res.setHeader("X-Powered-By", "OlivesJS + EmilyJS + Connect + CouchDB + Socket.io");
				res.setHeader("Hi Lab49!");
				next();
			})
			.use(connect.static(__dirname + "/public"))
).listen(8000));

http.globalAgent.maxSockets = Infinity;

// Need to tell Olives which socket.io to use
olives.registerSocketIO(io);

// Let's add the CouchDB handler coming from CouchDBTools
olives.handlers.set("CouchDB", CouchDBTools.handler);
