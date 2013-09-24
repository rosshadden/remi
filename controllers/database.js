module.exports = {
	index(req, res) {
		res.redirect("/database/list");
	},

	list(req, res) {
		delete req.session.database;
		delete req.session.table;
		delete req.session.tables;

		app.db.query(`
			show databases
		`)
		.then((databases) => {
			databases = databases.map((db) => (db.Database));
			req.session.databases = databases;

			res.view({ databases });
		});
	},

	view(req, res) {
		var database = req.params.id;
		delete req.session.table;
		log("database", database);

		if (!database) return res.redirect("/database/list");

		req.session.database = database;

		app.db.change({
			database
		})
		.then((err) => {
			app.db.query(`
				show table status
			`)
			.then((tables) => {
				req.session.tables = tables;

				res.view({ tables });
			});
		});
	}
};
