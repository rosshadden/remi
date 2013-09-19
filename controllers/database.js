var list;

module.exports = {
	index(req, res) {
		res.redirect("/database/list")
	},

	list(req, res) {
		app.db.query(`
			show databases
		`)
		.then((databases) => {
			list = databases.map((db) => (db.Database));
			res.view({
				databases: list
			});
		});
	},

	view(req, res) {
		app.db.change({
			database: list[req.params.id]
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
