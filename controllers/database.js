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

		if (database) {
			req.session.database = database;

			app.db.change({
				database
			})
			.then((err) => {
				app.db.query(`
					show tables
				`)
				.then((tables) => {
					tables = tables.map((table) => {
						for (let key in table) {
							return table[key];
						}
					});
					req.session.tables = tables;

					res.view({ tables });
				});
			});
		} else {
			res.redirect("/database/list");
		}
	}
};
