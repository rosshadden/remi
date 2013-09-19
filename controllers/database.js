module.exports = {
	index(req, res) {
		res.redirect("/database/list");
	},

	list(req, res) {
		app.db.query(`
			show databases
		`)
		.then((databases) => {
			res.view({
				databases: databases.map((db) => (db.Database))
			});
		});
	},

	view(req, res) {
		var database = req.params.id;

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
					res.view({
						tables: tables.map((table) => {
							for (let key in table) {
								return table[key];
							}
						})
					});
				});
			});
		} else {
			res.redirect("/database/list");
		}
	}
};
