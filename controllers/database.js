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
			delete req.session.tables;
			res.view({ databases });
		});
	},

	"/:database"(req, res, next, database) {
		app.db.change({
			database
		})
		.then((err) => {
			app.db.query(`
				show table status
			`)
			.then((tables) => {
				req.session.tables = tables;
				res.view("database/view", { tables });
			});
		});
	}
};
