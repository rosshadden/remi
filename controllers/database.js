var databases =

module.exports = {
	index(req, res) {
		res.redirect("/database/list")
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
		app.db.change({
			database: req.query.database
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
	}
};
