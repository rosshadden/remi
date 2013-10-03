var services = app.util.loader.dirSync("services");

var routes = {
	"/"(req, res, next) {
		req.url = "/database/list";
		next();
	},

	"/:database/:table?"(req, res, next) {
		var def;
		var {database, table} = req.params;
		if (~["list", "view"].indexOf(table)) return next();

		if (
			!app.config.db.database && database !== "database" ||
			app.config.db.database !== database
		) {
			def = app.db.change({ database })
		}
		req.state = { database, table };
		res.locals({ state: req.state });
		when(def).then(next);
	},

	"/:database"(req, res, next) {
		var database = req.params.database;

		if (database === "database") return next();

		req.url = `/database/view/${database}`;
		next();
	},

	"/:database/:table"(req, res, next) {
		var {database, table} = req.params;

		if (~["database", "table"].indexOf(database)) return next();

		req.url = `/table/view/${table}`;
		next();
	}
};

module.exports = routes;
