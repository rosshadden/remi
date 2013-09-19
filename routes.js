var services = app.util.loader.dirSync("services");

var routes = {
	"/": (req, res) => {
		res.view("index");
	}
};

module.exports = routes;
