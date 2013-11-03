var services = app.util.loader.dirSync("services");

var routes = {
	"/"(req, res, next) {
		req.url = "/database/list";
		next();
	},

	"/:database/:table?"(req, res, next, database, table) {
		if (database === "database") return next();

		var def;
		if (
			!app.config.db.database && database !== "database" ||
			app.config.db.database !== database
		) {
			def = app.db.change({ database })
		}
		req.state = { database, table };
		res.locals({ state: req.state });
		when(def).then(next);
	}
};

module.exports = routes;
