var services = app.util.loader.dirSync("services");

var routes = {
	"/": (req, res) => {
		res.redirect("/database/list");
	}
};

module.exports = routes;
