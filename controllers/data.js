module.exports = {
	tables(req, res) {
		app.db.change({
			database: req.query.database
		})
		.then((err) => {
			app.db.query(`
				show tables
			`)
			.then((tables) => {
				res.json(tables);
			});
		});
	}
};
