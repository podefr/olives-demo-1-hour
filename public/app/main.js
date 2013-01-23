define(['text!templates/main.html', 'OObject', 'Store'],

function Main(view, OObject, Store, Bind) {

	return function MainConstructor(transport) {

		var main = new OObject,
			model = new Store({});

		main.template = view;

		main.plugins.add('server', {
			uptime: function (node, time) {
				transport.listen("Stats", {
					method: "uptime",
					refresh: time
				}, function (uptime) {
					node.innerHTML = uptime;
				});
			}

		});

		main.render();

		return main;

	};

});
