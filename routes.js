var services = app.util.loader.dirSync("services");

var routes = {
	"/": (req, res) => {
		delete req.session.database;
		delete req.session.table;
		delete req.session.tables;
		res.view("index");
	}
};

module.exports = routes;
