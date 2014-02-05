// Required middleware
var connect = require("connect"),
	http = require("http"),
	socketIO = require("socket.io"),
	olives = require("olives"),
	emily = require("emily");

var io = socketIO.listen(
	http.createServer(
		connect()
			.use(connect.responseTime())
			.use(function (req, res, next) {
				res.setHeader("Server", "node.js/" + process.versions.node);
				res.setHeader("X-Powered-By", "OlivesJS + EmilyJS + Connect + Socket.io");
				res.setHeader("Hi Lab49!");
				next();
			})
			.use(connect.static(__dirname + "/public"))
).listen(8000));

http.globalAgent.maxSockets = Infinity;

var handlers = new emily.Store({
	"Stats": function (data, onEnd, onData) {
		var methods = {
			uptime: function () {
				setInterval(function () {
					onData(process.uptime());
				}, 1000);
			},

			platform: function () {
				onEnd(process.platform);
			},

			memoryUsage: function () {
				setInterval(function () {
					onData(process.memoryUsage()[data.type]);
				}, 1000);
			}
		};

		methods[data["method"]]();
	}
});

// Need to tell Olives which socket.io to use
olives.registerSocketIO(io, handlers);
