var services = app.util.loader.dirSync("services");

var routes = {
	"/": (req, res) => {
		res.send("Hello, world!");
	}
};

module.exports = routes;
