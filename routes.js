var services = app.util.loader.dirSync("services");

var routes = {
	"/"(req, res) {
		delete req.session.database;
		delete req.session.table;
		delete req.session.tables;
		res.view("index");
	},

	"/:database/:table?"(req, res, next) {
		if (!app.config.db.database) {
			app.db.change({
				database: req.params.database
			})
			.then(next);
		} else {
			next();
		}
	},

	"/:database"(req, res, next) {
		if (req.params.database === "database") return next();

		var database = req.params.database;

		req.url = `/database/view/${database}`;
		next();
	},

	"/:database/:table"(req, res, next) {
		if (~["database", "table"].indexOf(req.params.database)) return next();

		var {database, table} = req.params;

		req.session.database = database;
		req.url = `/table/view/${table}`;
		next();
	}
};

module.exports = routes;
