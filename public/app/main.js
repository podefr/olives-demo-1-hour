define(['text!templates/main.html', 'OObject'],

function Main(view, OObject) {

	return function MainConstructor(transport) {

		var main = new OObject;

		main.template = view;

		main.plugins.add('server', {
			uptime: function (node) {
				transport.listen("Stats", {
					method: "uptime"
				}, function (uptime) {
					node.innerHTML = uptime + " seconds";
				});
			},

			platform: function (node) {
				transport.request("Stats", {
					method: "platform"
				}, function (platform) {
					node.innerHTML = platform;
				});
			},

			memoryUsage: function (node, type) {
				transport.listen("Stats", {
					method: "memoryUsage",
					type: type
				}, function (value) {
					node.innerHTML = Math.round(value / 1000, 2) + " Kb";
				});
			}

		});

		main.render();

		return main;

	};

});
