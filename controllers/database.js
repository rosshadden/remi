module.exports = {
	index(req, res) {
		res.redirect("list")
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
	}
};
