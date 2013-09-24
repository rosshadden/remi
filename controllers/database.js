module.exports = {
	index(req, res) {
		res.redirect("/database/list");
	},

	list(req, res) {
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

		if (!database) return res.redirect("/database/list");

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
