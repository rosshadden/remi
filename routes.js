var services = app.util.loader.dirSync("services");

var routes = {
	"/"(req, res, next) {
		req.url = "/database/list";
		next();
	},

	"/:database/:table?"(req, res, next) {
		if (!app.config.db.database && req.params.database !== "database") {
			app.db.change({
				database: req.params.database
			})
			.then(next);
		} else {
			next();
		}
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

		req.session.database = database;
		req.url = `/table/view/${table}`;
		next();
	}
};

module.exports = routes;
